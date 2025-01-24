function MainApp({username}) {
    return (
        <p>Main Text</p>
    )
}

function App() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [credHash, setCredHash] = React.useState("");

    const handleLoginSubmit = async (e) => {
        const credentialHash = "SuperHash"; // TODO Hash password
        e.preventDefault();
        const response = await fetch(`/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${username} ${credentialHash}`,
            },
            body: JSON.stringify({
                action: "login",
                username: username,
                credHash: credentialHash,
            }),
        });
        const data = await response.json();
        if (data.status === "success") {
            setCredHash(credentialHash);
        }
    }

    const handleCreateAccount = async (e) => {
        const credentialHash = "SuperHash"; // TODO Hash password
        e.preventDefault();
        const response = await fetch(`/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${username} ${credentialHash}`,
            },
            body: JSON.stringify({
                action: "create",
                username: username,
                credHash: credentialHash,
            }),
        });
        const data = await response.json();
        if (data.status === "success") {
            setCredHash(credentialHash);
        }
    }

    return (
        <div>
            <div className="header">
                <div className = "current-user">
                    {credHash != "" ? username : "Not logged in"}
                </div>
                <div className="login-form">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleLoginSubmit}>Login</button>
                    <button onClick={handleCreateAccount}>
                        Create Account
                    </button>
                </div>
            </div>
            <main>
                {credHash && (
                    <MainApp username={username}/>
                )}
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App></App>);
