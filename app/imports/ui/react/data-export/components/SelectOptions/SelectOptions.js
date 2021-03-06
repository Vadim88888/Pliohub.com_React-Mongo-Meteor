import React, { PropTypes } from 'react';
import Form from '/imports/ui/react/forms/components/Form';
import Checkbox from '/imports/ui/react/forms/components/Checkbox';

const SelectOptions = ({ fields }) => (
  <div className="relative">
    <Form.SubForm name="fields">
      {fields.map(({ name, label, isDefault }) =>
        <Checkbox checked={isDefault} name={name} text={label} key={`risk-export-${name}`} />
      )}
    </Form.SubForm>
  </div>
);

SelectOptions.propTypes = {
  fields: PropTypes.array,
};

export default SelectOptions;
