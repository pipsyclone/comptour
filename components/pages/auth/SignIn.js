'use client'
import Logo from "@/assets/image/logo.png";
import Image from "next/image";
import AuthControllers from "@/controllers/AuthControllers";

const SignInComponent = () => {
    const {
        isLoading,
        email, setEmail, password, setPassword, HandleSignIn
    } = AuthControllers()
    return (
        <div className="card middle row-column gap-3 w-20">
            <Image src={Logo} alt="Logo Comptour" className="align-center" width={200} height={0} />
            <hr />
            <form onSubmit={HandleSignIn} className="row-column gap-3">
                <input type="email" className="form-ctrl" placeholder="jhondoe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="form-ctrl" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={isLoading ? "btn btn-primary disabled" : "btn btn-primary"}>
                    {isLoading ? <div className="loader"></div> : "Sign In"}
                </button>
            </form>
        </div>
    )
}

export default SignInComponent;