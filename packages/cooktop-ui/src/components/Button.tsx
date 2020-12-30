import React from 'react';
import styled from '@emotion/styled';
import { forwardRef, Ref, PropsWithChildren } from 'react';

export type Intent =
	| 'critical'
	| 'info'
	| 'light'
	| 'link'
	| 'neutral'
	| 'success'
	| 'unstyled'
    | 'warning';

interface ButtonProps {
	disabled?: boolean;
}

const BaseButton = styled.button`
	font: inherit;
	font-size: 100%;
	line-height: normal;
	margin: 0;
	padding: 7px 14px;
	display: flex;
	outline: 0;
	border: none;
	border-radius: 5px;
	font-weight: 700px;
	justify-content: center;
	align-items: center;
	opacity: ${({ disabled }: ButtonProps) => (disabled ? 0.5 : 1)};
	overflow: visible;

	&:focus {
		outline: 0;
	}

	&:active {
		outline: 0;
		box-shadow: ${({ disabled }: ButtonProps) =>
			disabled ? 'none' : 'inset 0 0 6px 0 rgba(0, 0, 0, 0.25)'};
	}
`;

const PrimaryButton = styled(BaseButton)`
	background-color: #3a5da9;
	color: white;

	&:active {
		background-color: ${({ disabled }: ButtonProps) => (disabled ? '#3167a9' : '#2c5c98')};
		border-color: ${({ disabled }: ButtonProps) => (disabled ? '#2c5c98' : '#275287')};
	}
`;

const SuccessButton = styled(BaseButton)`
	background-color: #3fb850;
	color: white;
	border: 1px solid #38a548;

	&:active {
		background-color: ${({ disabled }: ButtonProps) => (disabled ? '#3fb850' : '#38a548')};
		border-color: ${({ disabled }: ButtonProps) => (disabled ? '#38a548' : '#329340')};
	}
`;

const DangerButton = styled(BaseButton)`
	background-color: #ff4e4e;
	color: white;
	border: 1px solid #e54646;

	&:active {
		background-color: ${({ disabled }: ButtonProps) => (disabled ? '#ff4e4e' : '#e54646')};
		border-color: ${({ disabled }: ButtonProps) => (disabled ? '#e54646' : '#cc3e3e')};
	}
`;

const WarningButton = styled(BaseButton)`
	background-color: #ffe44e;
	color: white;
	border: 1px solid #e5cd46;

	&:active {
		background-color: ${({ disabled }: ButtonProps) => (disabled ? '#ffe44e' : '#e5cd46')};
		border-color: ${({ disabled }: ButtonProps) => (disabled ? '#e5cd46' : '#ccb63e')};
	}
`;

const InfoButton = styled(BaseButton)``;

const LightButton = styled(BaseButton)`
	background-color: white;
	border: 1px solid #3167a9;
	color: #3167a9;

	&:active {
		color: ${({ disabled }: ButtonProps) => (disabled ? '#3167a9' : '#184e90')};
		border-color: ${({ disabled }: ButtonProps) => (disabled ? '#3167a9' : '#184e90')};
	}
`;

const LinkButton = styled(BaseButton)`
	background-color: transparent;
	color: #3167a9;
	box-shadow: none;

	&:active {
		color: ${({ disabled }: ButtonProps) => (disabled ? '#3167a9' : '#184e90')};
		text-decoration: ${({ disabled }: ButtonProps) => (disabled ? 'none' : 'underline')};
		box-shadow: none;
	}
`;

const SvgButton = styled(BaseButton)`
	background-color: transparent;
	color: #3167a9;
	box-shadow: none;
	border: none;
	margin: 0;
	padding: 0;
	display: inline-block;
	background: transparent;

	&:active {
		background: transparent;
		box-shadow: none;
	}
`;

interface Props {
	intent?: Intent;
	disabled?: boolean;
	className?: string;
	onClick?(): void;
	/**
	 * Defines if the Action get dispatched when the user taps down, or when the user taps up.
	 * For most cases tap down is best because it is more responsive and prevents clicks from getting lost.
	 * When a button is embedded in a scrolling container the container should get priority over the scrolling
	 * interaction. In that case the Action gets dispatched on tap up.
	 **/
	responsive?: boolean;
}

function InternalButton(
	{
		children,
		intent = 'neutral',
		disabled,
		onClick,
		responsive = true,
		...other
	}: PropsWithChildren<Props>,
	ref: Ref<HTMLButtonElement>,
) {
	const buttons = {
		neutral: PrimaryButton,
		success: SuccessButton,
		critical: DangerButton,
		warning: WarningButton,
		info: InfoButton,
		light: LightButton,
		link: LinkButton,
		unstyled: SvgButton,
	};
	const Button = buttons[intent];
	const clickCallBack = () => {
		if (!disabled && onClick) {
			onClick();
		}
	};

	if (Button) {
		return (
			<Button
				{...other}
				ref={ref}
				disabled={disabled}
				onPointerDown={responsive ? clickCallBack : undefined}
				onClick={responsive ? undefined : clickCallBack}
				role="button"
			>
				{children}
			</Button>
		);
	}

	throw new Error(`Unknow button intent - ${intent}`);
}

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(InternalButton);
