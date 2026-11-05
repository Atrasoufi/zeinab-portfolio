import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Video Generation API (Interactions API with gemini-omni-1.1-flash)
app.post('/api/generate-video', async (req: Request, res: Response): Promise<void> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'GEMINI_API_KEY is not configured in the server environment.',
    });
    return;
  }

  const {
    mode = 'text',
    prompt,
    imageBase64,
    mimeType = 'image/png',
    aspectRatio = '16:9',
    duration = '10s',
    model = 'gemini-omni-1.1-flash',
  } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const selectedAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

  try {
    const ai = new GoogleGenAI({ apiKey });

    let interaction;

    if (mode === 'image' && imageBase64) {
      // Strip potential data URL prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

      interaction = await ai.interactions.create(
        {
          model: model || 'gemini-omni-1.1-flash',
          input: [
            {
              type: 'image',
              mime_type: mimeType,
              data: cleanBase64,
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
          background: false,
          store: false,
          stream: false,
          response_format: {
            type: 'video',
            aspect_ratio: selectedAspectRatio,
          },
        },
        { timeout: 300000 }
      );
    } else {
      // Text-to-Video
      interaction = await ai.interactions.create(
        {
          model: model || 'gemini-omni-1.1-flash',
          input: prompt,
          background: false,
          store: false,
          stream: false,
          response_format: {
            type: 'video',
            aspect_ratio: selectedAspectRatio,
            duration: duration || '10s',
            resolution: '720p',
          },
        },
        { timeout: 300000 }
      );
    }

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      const mime = videoPart.mime_type || 'video/mp4';
      res.json({
        success: true,
        videoData: `data:${mime};base64,${videoPart.data}`,
        mimeType: mime,
        aspectRatio: selectedAspectRatio,
        mode,
      });
      return;
    }

    // Check steps array if helper did not pick it up
    for (const step of (interaction.steps as any[]) || []) {
      if (step.type === 'model_output' && Array.isArray(step.content)) {
        const vid = step.content.find((c: any) => c?.type === 'video');
        if (vid && vid.data) {
          const mime = vid.mime_type || 'video/mp4';
          res.json({
            success: true,
            videoData: `data:${mime};base64,${vid.data}`,
            mimeType: mime,
            aspectRatio: selectedAspectRatio,
            mode,
          });
          return;
        }
      }
    }

    res.status(502).json({
      error: 'The model completed the interaction but did not return video bytes.',
      status: interaction.status,
    });
  } catch (err: any) {
    console.error('Error generating video:', err);
    res.status(500).json({
      error: err?.message || 'Failed to generate video with Gemini Interactions API.',
    });
  }
});

// Animate Hero Endpoint
app.post('/api/animate-hero', async (req: Request, res: Response): Promise<void> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'GEMINI_API_KEY is not configured in the server environment.',
    });
    return;
  }

  const { customPrompt, customImageBase64 } = req.body;

  try {
    let cleanBase64 = customImageBase64;
    let mimeType = 'image/png';

    if (!cleanBase64) {
      // Read the existing hero clean character asset
      const heroPath = path.resolve('public/assets/portfolio/hero_girl_clean.png');
      if (fs.existsSync(heroPath)) {
        const buf = fs.readFileSync(heroPath);
        cleanBase64 = buf.toString('base64');
      } else {
        res.status(404).json({ error: 'Hero character image asset not found on server.' });
        return;
      }
    } else {
      cleanBase64 = cleanBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt =
      customPrompt ||
      'Cinematic subtle ambient loop of this illustrated anime-styled developer girl with glowing headphones, gentle hair movement, soft ambient neon pink lighting, softly drifting ethereal butterflies in the dark background, seamless loop, 16:9 aspect ratio';

    const interaction = await ai.interactions.create(
      {
        model: 'gemini-omni-1.1-flash',
        input: [
          {
            type: 'image',
            mime_type: mimeType,
            data: cleanBase64,
          },
          {
            type: 'text',
            text: prompt,
          },
        ],
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: '16:9',
        },
      },
      { timeout: 300000 }
    );

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      const mime = videoPart.mime_type || 'video/mp4';
      res.json({
        success: true,
        videoData: `data:${mime};base64,${videoPart.data}`,
        mimeType: mime,
        aspectRatio: '16:9',
      });
      return;
    }

    res.status(502).json({
      error: 'No video output was returned by the Omni model.',
    });
  } catch (err: any) {
    console.error('Error animating hero character:', err);
    res.status(500).json({
      error: err?.message || 'Failed to animate hero character.',
    });
  }
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
