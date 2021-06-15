export const getUser = (dispatch, callback) => {
  // fetching from the local storage
  let profile = localStorage.getItem("userProfile");
  if (profile === null) {
    return callback();
  }
  profile = JSON.parse(profile);

  // add to reducer
  if (profile.googleSignin) {
    dispatch({
      type: "SET_GOOGLE_DATA",
      name: profile.name,
      imageUrl: profile.profile_img,
      isGoogleSignin: profile.googleSignin,
    });
  } else {
    dispatch({
      type: "SET_GUEST_DATA",
      name: profile.name,
      isGoogleSignin: profile.googleSignin,
    });
  }

  return { name: profile.name, imageUrl: profile.profile_img };
};
