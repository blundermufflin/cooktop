/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, {
  Fragment,
  FunctionComponent,
  MouseEventHandler,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { useToggle } from '../../hooks';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { createCipher } from 'crypto';

const PageLayout = styled.div`
  display: grid;
  height: 100%;
`;

const Container = styled.div`
  width: 380px;
  height: 355px;
  background: #373f4a;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  flex-wrap: wrap;
  color: #ddd;
  margin: 20px;
`;

const Heading = styled.div`
  font-size: 34px;
  font-weight: 700;
  flex-basis: 1 100%;
`;

const Sequencer: FunctionComponent = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        background-color: #777777;
        padding: 10px;
      `}
    >
      {children}
    </div>
  );
};

const SRow = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
`;

type SToggleProps = {
  handleClick?: (on: boolean) => void;
} & { children?: ReactNode };

const SToggle = ({ children, handleClick }: SToggleProps) => {
  const [on, toggle] = useToggle();
  return (
    <div
      onClick={() => {
        handleClick && handleClick(on as boolean);
        (toggle as () => void)();
      }}
      css={css`
        flex: 1 auto;
        border-radius: 3px;
        background-color: ${on ? '#76d8ff' : '#e6e1e1'};
        margin: 5px;
        cursor: pointer;
      `}
    >
      {children}
    </div>
  );
};

const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <Container>
        <Sequencer>
          <SRow>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
          </SRow>
          <SRow>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
          </SRow>
          <SRow>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
          </SRow>
          <SRow>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
            <SToggle></SToggle>
          </SRow>
        </Sequencer>
      </Container>
      <Container>
        <Synth scale={5}></Synth>
      </Container>
    </PageLayout>
  );
};

type SynthProps = {
  scale: number;
};

const Synth = ({ scale }: SynthProps) => {
  var audioCtx = new window.AudioContext();

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(1, audioCtx.currentTime); // value in hertz

  const onDrag: DraggableEventHandler = (e: any, data: DraggableData) => {
    oscillator.frequency.setValueAtTime(data.x * scale, audioCtx.currentTime);
  };

  return (
    <div css={css`display: flex; height: 100px;`}>
      <Knob></Knob>
      <Sequencer>
        <SRow>
          <SToggle
            handleClick={(on) => {
              if (!on) {
                try {
                  oscillator.start();
                } catch (e) {
                  console.log(e);
                }
                oscillator.connect(audioCtx.destination);
              } else {
                oscillator.disconnect(audioCtx.destination);
              }
            }}
          ></SToggle>
        </SRow>
      </Sequencer>
      <Slider axis="x" handleDrag={onDrag}></Slider>
    </div>
  );
};

const Knob = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 4px solid #000;
  background-color: #2b2b2b;
  margin: 4px;
`;

type DraggableData = {
  node: HTMLElement;
  // lastX + deltaX === x
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};

type Props = {
  axis: 'x' | 'y';
  handleStart?: DraggableEventHandler;
  handleDrag?: DraggableEventHandler;
  handleStop?: DraggableEventHandler;
} & { children?: ReactNode };

const Slider = ({
  axis,
  handleDrag,
  handleStop,
  handleStart,
}: Props): JSX.Element => {
  const nodeRef = React.useRef(null);
  const start: DraggableEventHandler = handleStart || ((e, data) => {});
  const drag: DraggableEventHandler = handleDrag || ((e, data) => {});
  const stop: DraggableEventHandler = handleStop || ((e, data) => {});

  return (
    <div
      css={css`
        width: ${axis === 'x' ? '115px' : '20px'};
        height: ${axis === 'y' ? '115px' : '20px'};
        background-color: #2b2b2b;
        margin: 4px;
      `}
    >
      <Draggable
        axis={axis}
        bounds={
          axis === 'x' ? { left: 0, right: 100 } : { top: 0, bottom: 100 }
        }
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[2, 2]}
        scale={1}
        onStart={start}
        onDrag={drag}
        onStop={stop}
        nodeRef={nodeRef}
      >
        <div
          css={css`
            width: ${axis === 'x' ? '15px' : '100%'};
            height: ${axis === 'y' ? '15px' : '100%'};
            border: 1px solid #000000;
            background-color: #9c3535;
          `}
          ref={nodeRef}
          className="handle"
        ></div>
      </Draggable>
    </div>
  );
};

export default MainPage;
