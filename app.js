require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

const cors = require('cors');

// import mongoDB
var mongoose = require('mongoose');
var config = require('./database/mongodb');
var sessionsRouter = require('./routes/userConnected');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var privateRouter = require('./routes/private');
var uploadRouter = require('./routes/upload');
var educationRouter = require('./routes/education');
var experienceRouter = require('./routes/experience');
var coursesRouter = require('./routes/course');
var projectRouter = require('./routes/project');
var skillRouter = require('./routes/skill');
var pageRouter = require('./routes/page');
var reviewscoursesRouter = require("./routes/reviewsCourse");
var usercourseRouter = require("./routes/usercourse");
var certifrouter = require('./routes/certification');
var favorisrouter = require('./routes/favoris');
var followuserRouter = require('./routes/followuser');
var followpageRouter = require('./routes/followpage');
var quizRouter = require('./routes/quiz');
var budgeRouter = require('./routes/budge');
var PagecategoryRouter = require('./routes/PageCategory');
var NotificationRouter = require('./routes/notification');
var CvRouter = require('./routes/cv');
var groupsRouter = require('./routes/group');
var messageRouter = require('./routes/message');
var groupmemberrouter = require('./routes/groupmember');
var taskrouter = require('./routes/task');
var historyrouter = require('./routes/Historique');
var postrouter = require("./routes/postRoute");
var postCatrouter = require("./routes/categoryPostRoute");
var comrouter = require("./routes/commentRoute");
var reactrouter = require("./routes/reactRoute");
var comments = require("./models/comment");
var recorouter = require("./routes/recorouter");

var app = express();
app.use(cors());

// mongo config
mongoose.connect(process.env.MONGO_URI, 
	{ useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: true
  },
	()=> console.log("Connected to DB!!!"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname + '/'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth',authRouter);
app.use('/api/private',privateRouter);
app.use('/api/upload',uploadRouter);
app.use('/education',educationRouter);
app.use('/experience',experienceRouter);
app.use('/project',projectRouter);
app.use('/skill',skillRouter);
app.use('/page',pageRouter);
app.use('/followuser',followuserRouter);
app.use('/followpage',followpageRouter);
app.use('/quiz',quizRouter);
app.use('/budge',budgeRouter);
app.use('/category',PagecategoryRouter);
app.use('/notif',NotificationRouter);
app.use('/cv',CvRouter);
app.use('/course', coursesRouter);
app.use('/reviewc', reviewscoursesRouter);
app.use('/usercourse', usercourseRouter);
app.use('/certif', certifrouter);
app.use('/favoris', favorisrouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/message', messageRouter);
app.use('/groupmember', groupmemberrouter);
app.use('/task', taskrouter);
app.use('/historique', historyrouter);
app.use("/pi/postRoute", postrouter);
app.use("/pi/catRoute", postCatrouter);
app.use("/pi/commentRoute", comrouter);
app.use("/pi/reactRoute", reactrouter);
app.use('/reco', recorouter);
app.use('/sessions', sessionsRouter);

app.use('/accept', require('./routes/useracceptedRouter'))
// DATABASE Config
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to the database");
});
mongoose.connection.on("error", (err) => {
  console.error("failed to connect to the database: ${err}");
});



app.use('/images',express.static('uploads'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});



//CHAT !!!!!!


const PORT =process.env.PORT || 3000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});


userInRoom = {};

ROOM_ID = "";

io.on("connection", (socket) => {
  // =================== VIDEO ======================
  socket.on("join user", ({ roomID, roomName, name, imageUrl }) => {
    // join user to the room
    socket.join(roomID);
    // check room is full or not
    if (userInRoom[roomID]) {
      const length = userInRoom[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      userInRoom[roomID].push({ userId: socket.id, roomName, name, imageUrl });
    } else {
      userInRoom[roomID] = [{ userId: socket.id, roomName, name, imageUrl }];
    }

    ROOM_ID = roomID;
    console.log("32", roomID);
    // fetch all users in the room
    const userInThisRoom = userInRoom[roomID].filter(
      (user) => user.userId != socket.id
    );
    socket.emit("all users", userInThisRoom);
  });

  // sending the signal
  socket.on("sending signal", ({ userToSignal, callerId, signal, roomID }) => {
    // sending my data to the connevtor
    const callerData = userInRoom[roomID].find(
      (user) => user.userId === socket.id
    );
    socket.to(userToSignal).emit("user join", callerId, signal, callerData);
  });

  // returning signal
  socket.on("returning signal", ({ callerId, signal }) => {
    socket.to(callerId).emit("recieving returning signal", {
      signal,
      id: socket.id,
    });
  });

  // ====================== CHAT =======================
  socket.on("sending message", (message) => {
    // fetching user ID
    const senderData = userInRoom[ROOM_ID].find(
      (user) => user.userId === socket.id
    );
    console.log("64", ROOM_ID, senderData, message);

    // sending message to the other users
    io.to(ROOM_ID).emit("message", { message, senderData });
  });
   //====================Najiba Socket =======================
   socket.on("createComment", async (msg) => {
    console.log(msg);
    const { username, post_id, description, createdAt, send } = msg;
    const newComment = new comments({ username, post_id, description, createdAt });

    if (send === "replyComment") {
      const { _id, username, post_id, description, createdAt } = newComment;
      const comment = await comments.findById(post_id);
      if (comment) {
        comment.reply.push({ _id, username, description, createdAt });

        await comment.save();
        io.emit("sendReplyCommentToClient", comment);
      }
    } else {
      await newComment.save();

      io.emit("sendCommentToClient", newComment);
    }
  });
  socket.on("deleteComment", async (msg) => {
    const { _id, username, post_id, description, createdAt, reply } = msg;
    const newComment = new comments({ _id, username, post_id, description, createdAt, reply });
    const id = newComment.post_id;
    await comments.deleteOne({ _id: newComment._id });
    const comment = await comments.find({ post_id: id });
    io.emit("commentDeleted", comment);
  });
  socket.on("updateComment", async (msg) => {
    const { _id, username, post_id, description, updatedAt, reply } = msg;
    const newComment = new comments({ _id, username, post_id, description, updatedAt, reply });

    const updated = await comments.updateOne(
      { _id: newComment._id },
      { description, post_id, updatedAt, reply }
    );

    const comment = await comments.find(newComment.post_id);

    io.emit("commentUpdated", comment);
  });
  socket.on("voteComment", async (msg) => {
    const { id, username } = msg;

    const toLike = await comments.findById({ _id: id });

    console.log(toLike);
    toLike.votes.push(username);
    toLike.save();
    io.emit("commentVoted");
  });

  socket.on("unvoteComment", async (msg) => {
    const { id, username } = msg;

    const toLike = await comments.findById({ _id: id });

    console.log(toLike);
    toLike.votes.pull(username);
    toLike.save();
    io.emit("commentUnvoted");
  });

  // =================== On Disconnect ========================
  socket.on("disconnect", () => {
    console.log("user left");
    const roomId = ROOM_ID;
    let room = userInRoom[roomId];
    if (room) {
      room = room.filter((user) => user.userId !== socket.id);
      userInRoom[roomId] = room;
    }
    socket.broadcast.emit("user left", socket.id);
  });
});

app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

/*app.listen(process.env.PORT||3000, () => {
  console.log(`Server up and running on port number ${PORT}`);
});*/

server.listen(process.env.PORT||3000, () => {
  console.log(`Server up and running on port number ${PORT}`);
});



module.exports = app;
