// import {
//   TextField,
//   FormControlLabel,
//   Switch,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormHelperText,
//   Checkbox,
//   FormGroup,
//   FormLabel,
// } from "@/shared/components/forms";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { SettingFieldDefinition } from "@/shared/types/settings-definition";
import Input from "@/shared/components/forms/input";

type Props = {
  field: SettingFieldDefinition;
  control: Control<Record<string, unknown>>;
  errors: FieldErrors;
};

export const SettingFieldControl = ({ field, control, errors }: Props) => {
  const error = errors[field.key];
  const errorMessage = error?.message as string | undefined;
  return <></>;

  // switch (field.type) {
  //   case "boolean":
  //     return (
  //       <Controller
  //         name={field.key}
  //         control={control}
  //         render={({ field: rhf }) => (
  //           <FormControlLabel
  //             control={
  //               <Switch
  //                 checked={!!rhf.value}
  //                 onChange={(e) => rhf.onChange(e.target.checked)}
  //                 inputProps={{ "aria-label": field.label }}
  //               />
  //             }
  //             label={field.label}
  //           />
  //         )}
  //       />
  //     );

  //   case "text":
  //     return (
  //       <Controller
  //         name={field.key}
  //         control={control}
  //         render={({ field: rhf }) => (
  //           <Input
  //             {...rhf}
  //             value={rhf.value ?? ""}
  //             label={field.label}
  //             fullWidth
  //             error={!!error}
  //             helperText={errorMessage}
  //             aria-label={field.label}
  //           />
  //         )}
  //       />
  //     );

  //   case "number":
  //     return (
  //       <Controller
  //         name={field.key}
  //         control={control}
  //         render={({ field: rhf }) => (
  //           <TextField
  //             {...rhf}
  //             value={rhf.value ?? ""}
  //             onChange={(e) =>
  //               rhf.onChange(
  //                 e.target.value === "" ? "" : Number(e.target.value),
  //               )
  //             }
  //             type="number"
  //             label={field.label}
  //             fullWidth
  //             error={!!error}
  //             helperText={errorMessage}
  //             slotProps={{
  //               htmlInput: {
  //                 min: field.validation?.min,
  //                 max: field.validation?.max,
  //                 "aria-label": field.label,
  //               },
  //             }}
  //           />
  //         )}
  //       />
  //     );

  //   case "select":
  //     return (
  //       <FormControl fullWidth error={!!error}>
  //         <InputLabel id={`${field.key}-label`}>{field.label}</InputLabel>
  //         <Controller
  //           name={field.key}
  //           control={control}
  //           render={({ field: rhf }) => (
  //             <Select
  //               {...rhf}
  //               value={rhf.value ?? ""}
  //               labelId={`${field.key}-label`}
  //               label={field.label}
  //               aria-label={field.label}
  //             >
  //               {field.options?.map((opt) => (
  //                 <MenuItem key={opt.value} value={opt.value}>
  //                   {opt.label}
  //                 </MenuItem>
  //               ))}
  //             </Select>
  //           )}
  //         />
  //         {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
  //       </FormControl>
  //     );

  //   case "multiselect":
  //     return (
  //       <FormControl component="fieldset" error={!!error}>
  //         <FormLabel component="legend">{field.label}</FormLabel>
  //         <Controller
  //           name={field.key}
  //           control={control}
  //           render={({ field: rhf }) => {
  //             const selected = (rhf.value as string[]) ?? [];

  //             const handleToggle = (optionValue: string) => {
  //               const next = selected.includes(optionValue)
  //                 ? selected.filter((v) => v !== optionValue)
  //                 : [...selected, optionValue];
  //               rhf.onChange(next);
  //             };

  //             return (
  //               <FormGroup>
  //                 {field.options?.map((opt) => (
  //                   <FormControlLabel
  //                     key={opt.value}
  //                     control={
  //                       <Checkbox
  //                         checked={selected.includes(opt.value)}
  //                         onChange={() => handleToggle(opt.value)}
  //                         inputProps={{ "aria-label": opt.label }}
  //                       />
  //                     }
  //                     label={opt.label}
  //                   />
  //                 ))}
  //               </FormGroup>
  //             );
  //           }}
  //         />
  //         {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
  //       </FormControl>
  //     );

  //   default:
  //     return null;
  // }
};
