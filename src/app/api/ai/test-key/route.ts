import { NextRequest, NextResponse } from 'next/server';
import { GeminiAIProvider } from '@/lib/ai/gemini-provider';
import { GroqAIProvider } from '@/lib/ai/groq-provider';
import { OpenRouterAIProvider } from '@/lib/ai/openrouter-provider';
import { OpenAIProvider } from '@/lib/ai/openai-provider';
import { MockAIProvider } from '@/lib/ai/mock-provider';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, apiKey, modelName } = body;

    // 1. Smart Local Engine (Zero-Cost / No Key Needed)
    if (provider === 'mock' || !provider) {
      const mock = new MockAIProvider();
      const res = await mock.generateResponse({
        userMessage: 'Hello price check',
        conversationHistory: [],
        aiConfig: {
          id: '1',
          organizationId: 'org_1',
          agentName: 'Demo Agent',
          businessDescription: 'Testing',
          tone: 'Friendly',
          instructions: '',
          fallbackMessage: 'Fallback',
          handoffMessage: 'Handoff',
          status: 'ACTIVE',
        },
        knowledgeBase: [],
      });

      return NextResponse.json({
        success: true,
        provider: 'mock',
        message: '⚡ Smart Local AI Engine Ready! (100% Zero-Cost, No Key Required)',
        sampleResponse: res.replyText,
      });
    }

    // Key Validation Check
    if (!apiKey || apiKey.trim() === '' || apiKey === 'sk-demo-key') {
      return NextResponse.json(
        {
          success: false,
          error: `Please enter a valid API key for ${provider.toUpperCase()}. Or switch to Smart Local Engine for zero-cost operation.`,
        },
        { status: 400 }
      );
    }

    // 2. Google Gemini Free Tier Test
    if (provider === 'gemini') {
      const gemini = new GeminiAIProvider(apiKey, modelName || 'gemini-2.0-flash');
      const testRes = await gemini.generateResponse({
        userMessage: 'Respond with exactly: GEMINI_VERIFIED_SUCCESS',
        conversationHistory: [],
        aiConfig: {
          id: '1',
          organizationId: 'org_1',
          agentName: 'Gemini Tester',
          businessDescription: 'Testing key',
          tone: 'Friendly',
          instructions: 'Respond accurately',
          fallbackMessage: 'Fallback',
          handoffMessage: 'Handoff',
          status: 'ACTIVE',
        },
        knowledgeBase: [],
      });

      if (testRes.intentDetected === 'GEMINI_AI_GENERATED') {
        return NextResponse.json({
          success: true,
          provider: 'gemini',
          message: '✅ Google Gemini API Key Verified Successfully! (Model: gemini-2.0-flash)',
          sampleResponse: testRes.replyText,
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Gemini API call failed. Please verify your Google AI Studio API key.',
        }, { status: 400 });
      }
    }

    // 3. Groq Free Tier Test
    if (provider === 'groq') {
      const groq = new GroqAIProvider(apiKey, modelName || 'llama-3.3-70b-versatile');
      const testRes = await groq.generateResponse({
        userMessage: 'Respond with exactly: GROQ_VERIFIED_SUCCESS',
        conversationHistory: [],
        aiConfig: {
          id: '1',
          organizationId: 'org_1',
          agentName: 'Groq Tester',
          businessDescription: 'Testing key',
          tone: 'Friendly',
          instructions: 'Respond accurately',
          fallbackMessage: 'Fallback',
          handoffMessage: 'Handoff',
          status: 'ACTIVE',
        },
        knowledgeBase: [],
      });

      if (testRes.intentDetected === 'GROQ_LLAMA3_GENERATED') {
        return NextResponse.json({
          success: true,
          provider: 'groq',
          message: '✅ Groq Llama-3 API Key Verified Successfully! (Model: llama-3.3-70b-versatile)',
          sampleResponse: testRes.replyText,
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Groq API call failed. Please check your Groq Cloud API key.',
        }, { status: 400 });
      }
    }

    // 4. OpenRouter Free Tier Test
    if (provider === 'openrouter') {
      const openrouter = new OpenRouterAIProvider(apiKey, modelName || 'google/gemini-2.0-flash-exp:free');
      const testRes = await openrouter.generateResponse({
        userMessage: 'Ping test',
        conversationHistory: [],
        aiConfig: {
          id: '1',
          organizationId: 'org_1',
          agentName: 'OpenRouter Tester',
          businessDescription: 'Testing key',
          tone: 'Friendly',
          instructions: '',
          fallbackMessage: 'Fallback',
          handoffMessage: 'Handoff',
          status: 'ACTIVE',
        },
        knowledgeBase: [],
      });

      if (testRes.intentDetected === 'OPENROUTER_FREE_MODEL_GENERATED') {
        return NextResponse.json({
          success: true,
          provider: 'openrouter',
          message: '✅ OpenRouter API Key Verified Successfully!',
          sampleResponse: testRes.replyText,
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'OpenRouter API call failed. Please verify key.',
        }, { status: 400 });
      }
    }

    // 5. OpenAI Test
    if (provider === 'openai') {
      const openai = new OpenAIProvider(apiKey);
      const testRes = await openai.generateResponse({
        userMessage: 'Ping test',
        conversationHistory: [],
        aiConfig: {
          id: '1',
          organizationId: 'org_1',
          agentName: 'OpenAI Tester',
          businessDescription: 'Testing key',
          tone: 'Friendly',
          instructions: '',
          fallbackMessage: 'Fallback',
          handoffMessage: 'Handoff',
          status: 'ACTIVE',
        },
        knowledgeBase: [],
      });

      if (testRes.intentDetected === 'OPENAI_GENERATED') {
        return NextResponse.json({
          success: true,
          provider: 'openai',
          message: '✅ OpenAI Key Verified Successfully!',
          sampleResponse: testRes.replyText,
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'OpenAI API key verification failed.',
        }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'API key test failed' },
      { status: 500 }
    );
  }
}
