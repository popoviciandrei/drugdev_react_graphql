import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3
        },
        progress: {
            margin: theme.spacing.unit * 2,
        },
        container: {
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
        dense: {
            marginTop: 16,
        },
        button: {
            margin: theme.spacing.unit,
        },
        table: {
            maxWidth: 700,
            margin: '0 auto'
        },
        link: {
            margin: theme.spacing.unit,
        },
        list: {
            maxWidth: 400,
            margin: '0 auto',
        }
    })