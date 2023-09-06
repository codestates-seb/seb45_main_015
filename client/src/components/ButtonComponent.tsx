import React from "react";
import {
  LargeButtonTypeA,
  LargeButtonTypeB,
  LargeButtonTypeC,
  LargeButtonTypeD,
  MediumButtonTypeA,
  MediumButtonTypeB,
  MediumButtonTypeC,
  MediumButtonTypeD,
  SmallButtonTypeA,
  SmallButtonTypeB,
  SmallButtonTypeC,
  SmallButtonTypeD,
  PageButtonType,
} from "./components_style/ButtonComponent_styled";

interface ButtonTypeAProps {
  value: string;
}

// -------------------Large

// Large,파란배경,radius:20
export const LargeButtonA: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <LargeButtonTypeA>{value}</LargeButtonTypeA>;
};
// Large,파란배경,radius:90
export const LargeButtonB: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <LargeButtonTypeB>{value}</LargeButtonTypeB>;
};
// Large,하얀배경,radius:20
export const LargeButtonC: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <LargeButtonTypeC>{value}</LargeButtonTypeC>;
};
// Large,하얀배경,radius:90
export const LargeButtonD: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <LargeButtonTypeD>{value}</LargeButtonTypeD>;
};

// --------------------Medium

// Medium,파란배경,radius:20
export const MediumButtonA: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <MediumButtonTypeA>{value}</MediumButtonTypeA>;
};
// Medium,파란배경,radius:90
export const MediumButtonB: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <MediumButtonTypeB>{value}</MediumButtonTypeB>;
};
// Medium,하얀배경,radius:20
export const MediumButtonC: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <MediumButtonTypeC>{value}</MediumButtonTypeC>;
};
// Medium,하얀배경,radius:90
export const MediumButtonD: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <MediumButtonTypeD>{value}</MediumButtonTypeD>;
};

// ------------------------Small

// Small,파란배경,radius:20
export const SmallButtonA: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <SmallButtonTypeA>{value}</SmallButtonTypeA>;
};
// Small,파란배경,radius:90
export const SmallButtonB: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <SmallButtonTypeB>{value}</SmallButtonTypeB>;
};
// Small,하얀배경,radius:20
export const SmallButtonC: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <SmallButtonTypeC>{value}</SmallButtonTypeC>;
};
// Small,하얀배경,radius:90
export const SmallButtonD: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <SmallButtonTypeD>{value}</SmallButtonTypeD>;
};

// ------------------------PageNation

export const PageButton: React.FC<ButtonTypeAProps> = ({ value }) => {
  return <PageButtonType>{value}</PageButtonType>;
};
