import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Fazenda } from '../../../../../../../../../constants/entities';
import { Ground } from '../../../../../../../../../constants/sub-entites';
import { FormStepProps } from '../../create.types';
import validationSchema from './ground.validation';

const GroundForm: FC<FormStepProps> = ({ onNext = () => {}, fazenda }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [isGroundChecked, setIsGroundChecked] = useState(false);
  const [orografia, setOrografia] = useState(
    (fazenda &&
      fazenda[Fazenda.Ground] &&
      fazenda[Fazenda.Ground][Ground.Orografia]) ||
      ''
  );

  const handleChangeOrografia = (event: any) => {
    setOrografia(event.target.value);
  };
  const onSubmit = handleSubmit(data => {
    const dataToSend: any = {
      ...data,

      [Ground.Orografia]: orografia!,
    };
    console.log(dataToSend);

    localStorage.setItem('ground', JSON.stringify(dataToSend));

    onNext();
  });

  const handleChangeGroundCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGroundChecked(event.target.checked);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Extensão"
            variant="outlined"
            fullWidth
            label="Extensão"
            inputRef={register()}
            name={Ground.extension}
            error={!!errors[Fazenda.Extension]}
            helperText={errors[Fazenda.Extension]?.message}
            type="number"
            defaultValue={(fazenda && fazenda[Fazenda.Extension]) || 50}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Altitude Média"
            variant="outlined"
            fullWidth
            label="Altitude Média"
            inputRef={register()}
            name={Ground.AltitudeMedia}
            error={!!errors[Ground.AltitudeMedia]}
            helperText={errors[Ground.AltitudeMedia]?.message}
            type="number"
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Ground] &&
                fazenda[Fazenda.Ground][Ground.AltitudeMedia]) ||
              0
            }
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {/*  <TextField
            placeholder="Orografia"
            variant="outlined"
            fullWidth
            label="Orografia"
            inputRef={register()}
            error={!!errors[Ground.Orografia]}
            helperText={errors[Ground.Orografia]?.message}
            name={Ground.Orografia}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Ground] &&
                fazenda[Fazenda.Ground][Ground.Orografia]) ||
              ''
            }
          /> */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="orografia-label">Orografia</InputLabel>
            <Select
              labelId="orografia-label"
              id="orografia"
              name={Ground.Orografia}
              value={orografia}
              onChange={handleChangeOrografia}
              inputRef={register()}
              error={!!errors[Ground.Orografia]}
              label="Orografia"
            >
              <MenuItem value="">
                <em>Selecione o tipo de relevo</em>
              </MenuItem>
              <MenuItem value="PLANICIE">
                Planície - Terreno plano ou ligeiramente ondulado
              </MenuItem>
              <MenuItem value="CUMES_SUAVES">
                Cumes Suaves - Elevações suaves e arredondadas
              </MenuItem>
              <MenuItem value="ONDULADO">
                Terreno Ondulado - Sequência de elevações e depressões
              </MenuItem>
              <MenuItem value="MONTANHOSO">
                Montanhoso - Terreno com elevações acentuadas
              </MenuItem>
              <MenuItem value="VALE">Vale - Depressões entre elevações</MenuItem>
              <MenuItem value="PLANALTO">
                Planalto - Área elevada relativamente plana
              </MenuItem>
              <MenuItem value="ENCOSTA">Encosta - Terreno inclinado</MenuItem>
              <MenuItem value="SOCALCOS">
                Socalcos - Níveis diferentes de terreno plano
              </MenuItem>
              <MenuItem value="VARZEA">
                Várzea - Planície de inundação junto a rios
              </MenuItem>
              <MenuItem value="MISTO">
                Misto - Combinação de diferentes relevos
              </MenuItem>
            </Select>
            {errors[Ground.Orografia] && (
              <FormHelperText error>
                {errors[Ground.Orografia]?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <TextField
            placeholder="Propriedades Físicas"
            variant="outlined"
            fullWidth
            label="Propriedades Físicas"
            inputRef={register()}
            name={Ground.PropriedadesFisicas}
            error={!!errors[Ground.PropriedadesFisicas]}
            helperText={errors[Ground.PropriedadesFisicas]?.message}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Ground] &&
                fazenda[Fazenda.Ground][Ground.PropriedadesFisicas]) ||
              ''
            }
          />
        </Grid>

        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Area corrigida"
            variant="outlined"
            fullWidth
            label="Area corrigida"
            inputRef={register()}
            type="number"
            name={Ground.AreaCorrigida}
            error={!!errors[Ground.AreaCorrigida]}
            helperText={errors[Ground.AreaCorrigida]?.message}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Ground] &&
                fazenda[Fazenda.Ground][Ground.AreaCorrigida]) ||
              0
            }
          />
        </Grid>
        <Grid item md={12}>
          <FormControlLabel
            control={
              <Switch
                checked={isGroundChecked}
                onChange={handleChangeGroundCheck}
                inputProps={{ 'aria-label': 'controlled' }}
                color="primary"
              />
            }
            label="Análise do solo"
          />
        </Grid>
        {isGroundChecked && (
          <>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                placeholder="pH Médio"
                variant="outlined"
                fullWidth
                label="pH Médio"
                inputRef={register()}
                type="number"
                name={Ground.PhMedio}
                error={!!errors[Ground.PhMedio]}
                helperText={errors[Ground.PhMedio]?.message}
                defaultValue={
                  (fazenda &&
                    fazenda[Fazenda.Ground] &&
                    fazenda[Fazenda.Ground][Ground.PhMedio]) ||
                  0
                }
                required={isGroundChecked}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Soma das bases"
                inputRef={register()}
                type="number"
                name={Ground.SomaBases}
                error={!!errors[Ground.SomaBases]}
                helperText={errors[Ground.SomaBases]?.message}
                defaultValue={
                  (fazenda &&
                    fazenda[Fazenda.Ground] &&
                    fazenda[Fazenda.Ground][Ground.SomaBases]) ||
                  0
                }
                required={isGroundChecked}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="CTC"
                inputRef={register()}
                type="number"
                name={Ground.ctc}
                error={!!errors[Ground.ctc]}
                helperText={errors[Ground.ctc]?.message}
                defaultValue={Ground.ctc ?? 0}
                required={isGroundChecked}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Indíce de alumínio"
                inputRef={register()}
                type="number"
                name={Ground.indiceALuminio}
                error={!!errors[Ground.indiceALuminio]}
                helperText={errors[Ground.indiceALuminio]?.message}
                required={isGroundChecked}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Indíce de sódio"
                inputRef={register()}
                type="number"
                name={Ground.indiceSodio}
                error={!!errors[Ground.indiceSodio]}
                helperText={errors[Ground.indiceSodio]?.message}
                required={isGroundChecked}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Data de análise"
                inputRef={register()}
                type="date"
                name={Ground.dataAnalise}
                error={!!errors[Ground.dataAnalise]}
                helperText={errors[Ground.dataAnalise]?.message}
                required={isGroundChecked}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            style={{
              justifyItems: 'flex-end',
              marginTop: '15px',
              padding: '15px 10px',
            }}
          >
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Próximo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default GroundForm;
