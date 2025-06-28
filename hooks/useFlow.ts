import { useState } from "react";
import { FLOW_STATES } from "../constants/dreamfarm";

const useFlow = (): {
  flowState: FlowState;
  flowStates: string[];
  next: () => void;
  back: () => void;
  flowContext: FlowContext;
  setRegion: (region: string) => void;
  setCrop: (crop: string) => void;
  setBudget: (budget: string) => void;
  setExperience: (experience: string) => void;
  setFlowState: (state: FlowState) => void;
} => {
  const [flowState, setFlowState] = useState<FlowState>(FLOW_STATES[0]);
  const [flowContext, setFlowContext] = useState<FlowContext>({
    region: undefined,
    crop: undefined,
    budget: "2000~8000",
    experience: undefined,
  });
  const next = () => {
    // overflow check
    if (FLOW_STATES.indexOf(flowState) === FLOW_STATES.length - 1) {
      return;
    }
    setFlowState(FLOW_STATES[FLOW_STATES.indexOf(flowState) + 1]);
  };

  const back = () => {
    // underflow check
    if (FLOW_STATES.indexOf(flowState) === 0) {
      return;
    }
    setFlowState(FLOW_STATES[FLOW_STATES.indexOf(flowState) - 1]);
  };

  const setRegion = (region: string) => {
    setFlowContext({ ...flowContext, region });
  };

  const setCrop = (crop: string) => {
    setFlowContext({ ...flowContext, crop });
  };

  const setBudget = (budget: string) => {
    setFlowContext({ ...flowContext, budget });
  };

  const setExperience = (experience: string) => {
    setFlowContext({ ...flowContext, experience });
  };

  return {
    flowState,
    flowStates: FLOW_STATES,
    next,
    back,
    flowContext,
    setRegion,
    setCrop,
    setBudget,
    setExperience,
    setFlowState,
  };
};

export default useFlow;
