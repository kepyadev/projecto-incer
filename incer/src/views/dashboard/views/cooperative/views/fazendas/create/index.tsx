import { Box } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { Alert } from '@material-ui/lab';
import React, { FC, ReactNode } from 'react';

import Confirmation from './components/confirmation';
import GroundForm from './components/groundForm';
import IdentificationForm from './components/identificationForm';
import LocationForm from './components/locationForm';
import useStyles from './createForm.styles';

function getSteps() {
  return ['Identificação', 'Localização', 'Solo'];
}

interface CreateFazendaFormProps {
  modalHandleClose: () => void;
  // producer?: IProducer;
}
const CreateFazendaForm: FC<CreateFazendaFormProps> = ({ modalHandleClose }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function getStepContent(step: number): ReactNode {
    switch (step) {
      case 0:
        return <IdentificationForm onNext={handleComplete} />;
      case 1:
        return <LocationForm onNext={handleComplete} />;
      case 2:
        return <GroundForm onNext={handleComplete} />;
      default:
        return <Alert severity="error">Etapa desconhecida</Alert>;
    }
  }

  if (allStepsCompleted()) {
    return (
      <div>
        <Confirmation onReset={handleReset} onClose={modalHandleClose} />;
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Box className={classes.instructions}>{getStepContent(activeStep)}</Box>
        </div>
      </div>
    </div>
  );
};

export default CreateFazendaForm;
