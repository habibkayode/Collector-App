import React from 'react';
import StepIndicator from 'react-native-step-indicator';

import { customStyles } from '../../Styles/stepIndicatorStyles';
import { StepIndicatorPagesName } from '../../utils/constant';

const StepIndicatorComponent = (props) => {
	return (
		<StepIndicator
			customStyles={customStyles}
			currentPosition={props.currentPosition}
			labels={StepIndicatorPagesName}
			stepCount={4}
		/>
	);
};

export default StepIndicatorComponent;
