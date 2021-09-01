import React from "react"
import s from './Post.module.css'

const Post = (props) => {
   return (
      <div>
         <div className={s.item}>
            <img src="https://cs11.pikabu.ru/post_img/big/2020/04/15/7/15869461281221556.jpg"></img>
            <b>{props.name} </b>
            {props.message}
            <div>
               <span className="like">Like </span>{props.likesCount}
            </div>
         </div>

      </div>

   )
}
export default Post