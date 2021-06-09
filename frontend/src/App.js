import "./App.css";
import { HomePage } from "./containers/HomePage";
import { SignUp } from "./containers/SignUp";
import { SignIn } from "./containers/SignIn";
import { Questionnaire } from "./containers/Questionnaire";
import { ProfilePage } from "./containers/ProfilePage";
import { ForgotPassword } from "./containers/ForgotPassword";
import { ConfirmPassword } from "./containers/ConfirmPassword";
import { Admin } from "./containers/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import { AdminRoute } from "./adminRoute";
import { ChooseClub } from "./containers/ChooseClub";
import { Subclub } from "./containers/Subclub";
import { PrivateChat } from "./containers/PrivateChat";
import SubclubChat from "./containers/SubclubChat/SubclubChat";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route path="/confirmpassword" exact component={ConfirmPassword} />
          <Route path="/subclub" exact component={Subclub} />
          <ProtectedRoute exact path="/profile" component={ProfilePage} />
          <ProtectedRoute
            path="/questionnaire"
            exact
            component={Questionnaire}
          />
          <ProtectedRoute exact path="/chooseClub" component={ChooseClub} />
          <ProtectedRoute path="/privateChat" exact component={PrivateChat} />
          <ProtectedRoute path="/chat" exact component={SubclubChat} />
          <AdminRoute exact path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
