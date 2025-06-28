declare global {
  interface SvgIconProps {
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
  }
  
  type FlowState =
    | "region"
    | "crop"
    | "budget"
    | "experience"
    | "presubmit"
    | "roadmap";

  type FlowContext = {
    region?: string;
    crop?: string;
    budget?: string;
    experience?: string;
  };

  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    continuous: boolean;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onerror: (event: any) => void;
    onend: () => void;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    isFinal: boolean;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
}

export type {
  SvgIconProps,
  Schedule,
  Material,
  News,
  ChatType,
  FlowState,
  FlowContext,
  Teacher,
  Bridger,
};
