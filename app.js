var express       			=require('express'),
    app           			=express(),
    passport				=require('passport'),
	methodOverride			=require('method-override'),
	flash					=require('connect-flash'),
	bodyParser				=require('body-parser'),
	LocalStrategy			=require('passport-local'),
	User					=require('./models/user'),
	passportLocalMongoose	=require('passport-local-mongoose'),
    mongoose      			=require('mongoose'),
	camp		  			=require('./models/campgrounds.js'),
	Comments	  			=require("./models/comment.js")
	//seedDb		  			=require("./seeds");
//====================================================================================================

var campgroundsRoutes		=require("./routes/campgrounds"),
	commnetsRoutes			=require("./routes/comments"),
	indexRoutes				=require("./routes/index");

//====================================================================================================

//seedDb();
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useUnifiedTopology:true,useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(methodOverride("_method"));
app.use(flash());
app.use('/public', express.static('public'));

//=========================================================================================================

app.use(require('express-session')({
	secret:"corona",
	resave:false,
	saveUninitialized:false
	}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commnetsRoutes);
app.use(indexRoutes);










//==========================================================================================
app.listen(3000,function(){
	console.log("server is live");
});

