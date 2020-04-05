import React, { Component } from 'react'
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';

// React
import { connect } from 'react-redux';


const styles = (theme) => ({
    card: {
        marginBottom: 20
    }
});

export class Post extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            post: {
                content,
                createdAt,
                userImage,
                userHandle,
                postId,
                likeCount,
                commentCount
            },
            user: {
                authenticated
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={userImage}>
                            R
          </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={userHandle}
                    subheader={dayjs(createdAt).fromNow()}
                />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="like post">
                        <FavoriteIcon />
                        <Typography variant='subtitle2'>{likeCount}</Typography>
                    </IconButton>
                    <IconButton aria-label="comment on post">
                        <CommentIcon />
                        <Typography variant='subtitle2'>{commentCount}</Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {

}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Post));