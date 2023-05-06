import React from "react";
import { AuthenticationForm } from "./UserState/Login";
import { auth } from "../../../../Firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "./UserState/Logout";
import { Loader, Center } from "@mantine/core";
import "./UserState/Login.css";
import { Outlet } from "react-router-dom";
import { Dashboard } from "./UserState/Dashboard";

const Account = () => {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return (
			<div className="UserState">
				<Center style={{ width: "100vw", height: 400 }}>
					<Loader
						color="lime"
						variant="dots"
					/>
				</Center>
			</div>
		);
	}

	if (user) {
		return (
			<div className="UserState">
				<Dashboard>
						<Outlet />
				</Dashboard>
			</div>
		);
	}

	return (
		<div className="UserState">
			<div
				role="presentation"
				className="breadCrumbs"
			>
				<h2>My Account</h2>
				<div className="loginPage">
					<div className="authPage">
						<AuthenticationForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
