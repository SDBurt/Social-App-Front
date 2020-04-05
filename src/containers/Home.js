import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI
import Grid from '@material-ui/core/Grid'

// Redux
import { connect } from "react-redux";
import { getPosts } from '../redux/actions/dataActions'
// Components
import Post from '../components/Post'

export class Home extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {

        const { posts, loading } = this.props.data;

        let recentPostsMarkup = !loading
            ? (posts.map((post) => (
                <Post key={post.postId} post={post} />))
            ) : (
                <div><p>No Posts yet</p></div>
            );

        return (
            <div className="Home" >
                <Grid container spacing={6}>
                    <Grid item sm={8} xs={12}>
                        {recentPostsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <div>Profile</div>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

Home.propTypes = {
    data: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapActionsToProps = {
    getPosts
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
