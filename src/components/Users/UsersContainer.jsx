import React from 'react'
import {
    follow, requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from "../../common/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize ,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selectors";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
                   isAuth={this.props.isAuth}
                  // portionSize={this.props.portionSize}
            />
        </>
    }
}

let mapStateToProps = (state) => {

    return {

        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth,
       // portionSize: getPortionSize(state)
    }
}


export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers: requestUsers,
    })
,WithAuthRedirect
)(UsersContainer)
