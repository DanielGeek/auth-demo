import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { OpenModal } from '../../actions/employees';

const defaultToolbarStyles = {
	iconButton: {}
};

const CustomToolbar = (props) => {
	const dispatch = useDispatch();

	const handleClickNew = () => {
		dispatch(OpenModal());
	};
	const { classes } = props;

	return (
		<React.Fragment>
			<Tooltip title={'custom icon'}>
				<IconButton className={classes.iconButton} onClick={handleClickNew}>
					<AddIcon className={classes.deleteIcon} />
				</IconButton>
			</Tooltip>
		</React.Fragment>
	);
};

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar);
