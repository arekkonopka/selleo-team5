import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import React from 'react';
import { Authenticated, Unauthenticated } from './views';
import {GuardedRoute} from './components';

export class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <Router>
                <Switch>
                    <Route path="/auth">
                        <Unauthenticated/>
                    </Route>
                </Switch>

                <Switch>
                    <GuardedRoute component={Authenticated} exact path="/" auth={false}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
