import React from 'react';
import modalStyle from "./modalstyle"
import Modal from 'react-modal';
import { Box, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select} from '@material-ui/core';
import Task from '../tasks/task';
import UNPRODUCTIVE from '../app/constants';

Modal.setAppElement(document?.getElementById('root') ?? "root")

type Props = {
    modalIsOpen: boolean
    application_name: string,
    number_minutes: number,
    date_logged: Date,
    tasks: Task[]
    closeModal: () => void
    bookTime: (application_name: string, task_id: number) => void
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function BookModal({ modalIsOpen, application_name, number_minutes, date_logged, tasks, closeModal, bookTime }: Props) {
    var subtitle: HTMLHeadingElement | null;
    const classes = useStyles();
    const [task, setTask] = React.useState(-1)

    const handleChange = (event: any) => {
        setTask(event.target.value)
    }

    function afterOpenModal() {
        if (subtitle != null)
            subtitle.style.color = '#f00';
    }

    const getTaskMenuItems = () => {
        const menuItems = tasks.map(t => {
                return(<MenuItem key={t.id} value={t.id}>{t.title}</MenuItem>)
        })
        const menuItemsWithNonProductive = menuItems.concat(<MenuItem key={UNPRODUCTIVE} value={UNPRODUCTIVE}>{"Unproductive"}</MenuItem>)
        return (
            menuItemsWithNonProductive
        )
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Booking Modal">

                <h2 ref={_subtitle => (subtitle = _subtitle)}>Book time</h2>
                <form>
                    <label>Logged Detail</label>
                    <Box border={1}>
                        <Grid container>
                            <Grid item xs={8}>Application:</Grid>
                            <Grid item xs={4}>{application_name}</Grid>
                            <Grid item xs={8}>Number of minutes logged</Grid>
                            <Grid item xs={4}>{Math.round(number_minutes)}</Grid>
                            <Grid item xs={8}>Date logged</Grid>
                            <Grid item xs={4}>{date_logged.toUTCString()}</Grid>
                        </Grid>
                    </Box>
                    <br/>
                </form>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Task</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={task}
                        onChange={handleChange}
                    >
                        {getTaskMenuItems()}
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <div>
                    <button style={{ float: 'left' }} onClick={closeModal}>Cancel</button>
                    <button style={{ float: 'right' }} onClick={e => bookTime(application_name, task)}>Book Time</button>
                </div>
                
            </Modal>
        </div>
    )
}

export default BookModal