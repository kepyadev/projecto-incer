import { Box, Step, StepButton, Stepper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import ErrorFail from '../../../../../../../components/error-fail';
import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { getFazendaById } from '../../../../../../../services/fazenda';
import { IFazenda } from '../../../../../../../types/fazenda';
import Confirmation from '../create/components/confirmation';
import GroundForm from '../create/components/groundForm';
import IdentificationForm from '../create/components/identificationForm';
import LocationForm from '../create/components/locationForm';
import { FazendaUpdateFormProps } from './update.types';
import useStyles from './updateForm.styles';

function getSteps() {
  return ['Identificação', 'Localização', 'Solo'];
}

const UpdateFazendaForm: FC<FazendaUpdateFormProps> = ({ modalHandleClose }) => {
  const [fazenda, setFazenda] = useState<IFazenda | undefined>(undefined);
  const { error, setError, loading, setLoading, snackMessage, setSnackMessage } =
    useAsyncState();
  const id = localStorage.getItem('active_item');
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const steps = getSteps();
  const classes = useStyles();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getFazendaById(id)
        .then(res => {
          const data = res.data?.payload;
          if (data) setFazenda(data);
          // setError(new Error());
        })
        .catch(erro => {
          setError(erro);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError(new Error('Lamentamos, não foi selecionada nenhuma fazenda'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        return <IdentificationForm onNext={handleComplete} fazenda={fazenda} />;
      case 1:
        return <LocationForm onNext={handleComplete} fazenda={fazenda} />;
      case 2:
        return <GroundForm onNext={handleComplete} fazenda={fazenda} />;
      default:
        return <Alert severity="error">Etapa desconhecida</Alert>;
    }
  }

  if (error) return <ErrorFail text={error.message} />;

  if (loading) return <Loading />;

  if (!fazenda)
    return (
      <Alert severity="error">
        Lamentamos, a fazenda indicada não está disponível
      </Alert>
    );

  if (allStepsCompleted()) {
    return (
      <div>
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => {
            setSnackMessage(null);
            modalHandleClose();
          }}
        />
        <Confirmation
          onReset={handleReset}
          setSnackMessage={setSnackMessage}
          onClose={modalHandleClose}
          fazenda={fazenda}
        />
        ;
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

export default UpdateFazendaForm;
