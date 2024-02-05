import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomeScreen } from '../components/home/HomeScreen';
import { EmployeesScreen } from '../components/employees/EmployeesScreen';

export const DashboardRoutes = () => {

    return (
        <>
            <Navbar />

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/home" component={HomeScreen} />
                    
                    <Route 
                        exact
                        path="/employees" 
                        component={EmployeesScreen} />

                    {/* Any other route send me home*/}
                    <Redirect to="/home" />
                </Switch>
            </div>
        </>
    );
};
