import * as React from 'react';
import {TPropValue, TProp, TError} from '../types';
import Knob from './knob';

type TKnobsProps = {
  state: {[key: string]: TProp};
  set: (propValue: TPropValue, propName: string) => void;
  error: TError;
};

const KnobColumn: React.FC<TKnobsProps & {knobNames: string[]}> = ({
  state,
  knobNames,
  error,
  set,
}) => {
  return (
    <div
      style={{
        flexBasis: '50%',
        padding: `0 16px`,
      }}
    >
      {knobNames.map((name: string) => (
        <Knob
          key={name}
          name={name}
          error={error.where === name ? error.msg : null}
          description={state[name].description}
          type={state[name].type}
          val={state[name].value}
          options={state[name].options}
          placeholder={state[name].placeholder}
          set={(value: TPropValue) => set(value, name)}
          enumName={state[name].enumName}
        />
      ))}
    </div>
  );
};

const Knobs: React.FC<TKnobsProps> = ({state, set, error}) => {
  const [showAllKnobs, setShowAllKnobs] = React.useState(false);
  const allKnobNames = Object.keys(state);
  const filteredKnobNames = allKnobNames.filter((name: string) => state[name].hidden !== true);
  const knobNames = showAllKnobs ? allKnobNames : filteredKnobNames;
  const firstGroup = knobNames.slice(0, knobNames.length / 2);
  const secondGroup = knobNames.slice(knobNames.length / 2);
  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media screen and (max-width: 600px) {
          .react-view-columns {
            flex-wrap: wrap;
          }
        }
        .react-view-columns {
          display: flex;
          margin: 0 -16px;
        }
      `,
        }}
      />
      <div className="react-view-columns">
        <KnobColumn state={state} knobNames={firstGroup} set={set} error={error} />
        <KnobColumn state={state} knobNames={secondGroup} set={set} error={error} />
      </div>
      {filteredKnobNames.length !== allKnobNames.length && (
        <button onClick={() => setShowAllKnobs(!showAllKnobs)}>
          {showAllKnobs ? 'Show only basic props' : 'Show all props'}
        </button>
      )}
    </React.Fragment>
  );
};

export default Knobs;