const Home = () => {

  return(
    <div>
      <p>{`${user.username} is logged in`}</p>
      <button type='button' onClick={handleLogOut}>Log out</button>
      <Users users={users}/>
      <br />
      <br />
      <Toggable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm errorNuller={errorNuller} blogs={blogs} addBlogVisibility={addBlogVisibility}/>
      </Toggable>
      {blogs && <Blog blogs={blogs} />}
    </div>
  )
}

