import { ChangeEvent } from "react";

const date = new Date();

export const today = `${date.getFullYear()}-${
  date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
}-${date.getDate()}`;

type InputProps = {
  value: string;
  placeholder?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};

type MDPInputProps = {
  isError: boolean;
  span?: string;
} & InputProps;

const baseInputStyle =
  "w-full rounded-md border border-neutral-200 bg-zinc-800 py-2 px-3 leading-7 text-neutral-100 outline-none duration-300 placeholder:text-neutral-500 focus:border-primary-60 enabled:hover:border-primary-40 disabled:text-neutral-300";

function InputWrapper(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-1">{props.children}</div>;
}

function InputLabel(props: { id: string; label: string }) {
  return (
    <label
      htmlFor={props.id}
      className="font-semibold leading-7 text-primary-20"
    >
      {props.label}
    </label>
  );
}

export function EmailInput({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id="email" label="Adresse email" />

      <input
        className={`${baseInputStyle}`}
        id="email"
        type="email"
        placeholder="gaia@cosmo.tr"
        value={props.value}
        onChange={(e) => props.setState(e.currentTarget.value)}
        required={true}
      />
    </InputWrapper>
  );
}

export function PasswordInput({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id="password" label="Mot de passe" />

      <input
        className={`${baseInputStyle}`}
        id="password"
        type="password"
        placeholder="*********"
        value={props.value}
        onChange={(e) => props.setState(e.currentTarget.value)}
        required={true}
      />
    </InputWrapper>
  );
}

export function CreatePasswordInput({ ...props }: MDPInputProps) {
  return (
    <InputWrapper>
      <InputLabel id="password" label="Mot de passe" />

      <input
        className={`${baseInputStyle} ${
          props.isError
            ? "border-2 border-red-700 shadow-[0_0_3px] shadow-red-700"
            : "border-neutral-200 focus:border-primary-60 enabled:hover:border-primary-40"
        } `}
        id="password"
        type="password"
        placeholder="*********"
        value={props.value}
        onChange={(e) => props.setState(e.currentTarget.value)}
        required={true}
      />

      {props.span && (
        <span
          className={`text-sm ${
            props.isError ? "text-red-400" : "text-neutral-500"
          }`}
        >
          {props.span}
        </span>
      )}
    </InputWrapper>
  );
}

export function ConfirmPasswordInput({ ...props }: MDPInputProps) {
  return (
    <InputWrapper>
      <InputLabel id="confirm" label="Confirmez votre mot de passe" />

      <input
        className={`${baseInputStyle} ${
          props.isError
            ? "border-2 border-red-700 shadow-[0_0_3px] shadow-red-700"
            : "border-neutral-200 focus:border-primary-60 enabled:hover:border-primary-40"
        } `}
        id="confirm"
        type="password"
        placeholder="*********"
        value={props.value}
        onChange={(e) => props.setState(e.currentTarget.value)}
        required={true}
      />

      {props.span && (
        <span
          className={`text-sm ${
            props.isError ? "text-red-400" : "text-neutral-500"
          }`}
        >
          {props.span}
        </span>
      )}
    </InputWrapper>
  );
}

export function NameInput({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id="prénom" label="Prénom" />

      <input
        className={`${baseInputStyle}`}
        id="prénom"
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.setState(e.target.value)}
        required={true}
        disabled={props.disabled}
      />
    </InputWrapper>
  );
}

export function BirthdateInput({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id="birthdate" label="Date de naissance" />

      <input
        className={`${baseInputStyle} uppercase`}
        id="birthdate"
        type="date"
        value={props.value}
        onChange={(e) => props.setState(e.target.value)}
        required={true}
        disabled={props.disabled}
        min={"1900-01-01"}
        max={today}
      />
    </InputWrapper>
  );
}

export function BirthtimeInput({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id="birthtime" label="Heure de naissance" />

      <input
        className={`${baseInputStyle}`}
        id="birthtime"
        type="time"
        value={props.value}
        onChange={(e) => props.setState(e.target.value)}
        disabled={props.disabled}
      />
    </InputWrapper>
  );
}

export function GenderInput({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id="gender" label="Sexe" />

      <select
        className={`${baseInputStyle} enabled:cursor-pointer`}
        id="gender"
        name="sexe"
        value={props.value}
        onChange={(e) => props.setState(e.currentTarget.value)}
        disabled={props.disabled}
        required={true}
      >
        <option value="">Sélectionnez...</option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="not-specified">Préfère ne pas répondre</option>
      </select>
    </InputWrapper>
  );
}

export function DisabledEmailInput(props: { value: string }) {
  return (
    <InputWrapper>
      <InputLabel id="email" label="Adresse email" />

      <input
        className={`${baseInputStyle} disabled:text-neutral-200`}
        id="email"
        type="email"
        value={props.value}
        disabled={true}
      />

      <span className={`text-sm text-neutral-500`}>
        L&apos;adresse mail n&apos;est pas modifiable
      </span>
    </InputWrapper>
  );
}

export function SupportTextArea({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <textarea
        className={`${baseInputStyle} min-h-[14ch] resize-none`}
        id="support"
        value={props.value}
        onChange={(e) => props.setState(e.target.value)}
        placeholder="Signalez un problème, suggérez une nouvelle fonctionnalité ou laissez un commentaire général."
        required={true}
      />
    </InputWrapper>
  );
}

type TarotProps = {
  onKeyDown?: (e: any) => false | void;
} & InputProps;

export function TarotTextArea({ ...props }: TarotProps) {
  return (
    <InputWrapper>
      <textarea
        className={`${baseInputStyle} min-h-[14ch] resize-none`}
        id="question"
        value={props.value}
        onChange={(e) => props.setState(e.target.value)}
        onKeyDown={props.onKeyDown}
        placeholder="Ecrivez votre question ici..."
        required={true}
      />
    </InputWrapper>
  );
}

export function ParrainageInput(props: { value: string }) {
  return (
    <InputWrapper>
      <InputLabel id="parrainage" label="Mon code de parrainage" />

      <input
        className={`${baseInputStyle}`}
        id="parrainage"
        type="text"
        value={props.value}
        disabled={true}
      />
    </InputWrapper>
  );
}
