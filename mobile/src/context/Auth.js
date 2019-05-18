import React  from 'react'

export const AuthContext = React.createContext({});

export class AuthProvider extends React.PureComponent{

    state = {
        token : "",
        user: {},
        isLogin: false,
    }

    componentDidMount() {
        this.hasValidToken();
    }

    hasValidToken = async () => {
        const token = asyncStore.getItem('@token');
        if(!token) return;

        const request = this.request(token);

        try {
            const response = await request("GET", "api/users/me");
            if(response.success) {
                const {user} = response.data;
                if(user){
                    this.setState({user, token, isLogin: true});
                }
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    login = async (enrollment_number, password, email) => {
        const request = this.request();

        const url = "api/auth/signin";

        return new Promise((resolve, reject) => {
            try {
                const response  = await request("POST", url, {enrollment_number, password, email});
                if(response.success){
                    const {token, user} = response.data;

                    this.setState(
                        {
                            token,
                            user,
                            isLogin: true
                        }, 
                        () => {
                            asyncStore.setItem('@token', token);
                            resolve(true);
                        })
                }

                else throw new Error("Falha no login.");
            }
            catch(err){
                console.log(err);
                reject(false);
                throw err;
            }
        })
    }

    logout = () => {
        this.setState({
            token: "",
            user: {},
            isLogin: false
        },
            () => asyncStore.setItem('@token', "")
        )
    }

    //save image in another database in the future
    signup = async (userData) => {
        const request = this.request();
        const url = "api/auth/signup"

        return new Promise ((resolve, reject) => {
            try {
                const response = await request("POST", url, userData);
                if(response.success) {
                    resolve();
                }
                else {
                    console.log(response);
                    reject();
                }
            }
            catch(err) {
                console.log(err);
                throw err;
            }
        })
    }

    request = (savedToken) => {
        const token = savedToken || this.state.token;
        const host = process.env.HOST;

        return async (
            method,
            url,
            data
        ) => {
            const header = new Headers();
            header.append("Authorization", `JWT ${token}`);

            const route = new URL(`${host}/${url}`)

            //caso haja pesquisa um dia
            if(method === "GET" && data) {
                Object.keys(data).forEach(key => route.searchParams.append(key, data[key]))

            }
            else if(data) {
                options["body"] = JSON.stringify(data);
                header.append("Content-Type", "application/json");

                options["headers"] = header;

                try {
                    const requestPromise = fetch(route.href, options).then(res => res.json());
                    return await requestPromise;
                }
                catch(err){
                    console.log(err);
                    throw err;
                }
            }
        }
    }

    render() {
        const value = {
            state: {...this.state},
            action: {
                login: this.login,
                logout: this.logout,
                signup: this.signup,
                request: this.request()
            }
        }
        return <AuthContext.Provider value={value} {...this.props} />
    }
}