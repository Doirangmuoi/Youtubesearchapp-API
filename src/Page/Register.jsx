import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";
const register = (email, password, confirmPassword) => {
    if (!email || !password) {
        alert("Thiếu thông tin");
        return false;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải >= 6 ký tự");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp");
        return false;
    }
    const users = JSON.parse(localStorage.getItem("youtube_app_users")) || []


    const exist = users.find(u => u.email === email);

    if (exist) {
        alert("Email đã tồn tại");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
        email,
        password : hashedPassword,
        favorites: []
    };

    localStorage.setItem("users", JSON.stringify(users));

    users.push(newUser);
    localStorage.setItem(
        "youtube_app_users",
        JSON.stringify(users)
    );

    return true;
};
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            register(email, password, confirmPassword);
                console.log("Đăng kí thành công");
                alert("Đăng kí thành công");
                navigate("/");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
        } catch (err) {
            alert.err("Đăng kí không thành công",err);
            console.err("Đăng kí không thành công",err);
        }
    };

    return(
        <>
            <header className="w-96">
                <div className="banner"><img src="https://img.freepik.com/vector-cao-cap/banner-ngang-youtube-gradient-vector-mien-phi_726768-1152.jpg" alt="banner_yt"/></div>
            </header>
            <main className="bg-cyan-800">
                <div className="container flex  items-center justify-center h-screen">
                    <form onSubmit={handleSubmit}>
                        <h2 className="flex items-center bg-red-100 w-350 rounded-sm">Đăng kí</h2>
                        <div className="form-group p-5">
                            <input type="email" className="bg-white/20 backdrop-blur-md border border-white/30
         rounded-xl px-4 py-2 text-white placeholder-gray-300
         focus:ring-2 focus:ring-white outline-none" placeholder="Email..." value={email}
                             onChange={(e) => setEmail(e.target.value)}
                            />Email
                        </div>
                        <div className="form-group p-5">
                            <input type="password"  className="bg-white/20 backdrop-blur-md border border-white/30
         rounded-xl px-4 py-2 text-white placeholder-gray-300
         focus:ring-2 focus:ring-white outline-none" placeholder="Password..." value={password}
                             onChange={(e) => setPassword(e.target.value)}
                            />Password
                        </div>
                        <div className="form-group p-5">
                            <input type="password"  className="bg-white/20 backdrop-blur-md border border-white/30
         rounded-xl px-4 py-2 text-white placeholder-gray-300
         focus:ring-2 focus:ring-white outline-none" placeholder="Comfirm pasword..." value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                            />Confirm password
                        </div>
                        <button type="submit" className="p-5">Đăng kí</button>
                        <Link to="/login">
                           Bạn đã có tài khoản? Đăng nhập
                        </Link>
                    </form>
                </div>
            </main>
            <footer className="flex items-center bg-sky-50">
                <p>Họ tên : Ngô Bảo Nam</p>
                <p>Email: baonam.ngo@gmail.com</p>
                <p>Lớp: T2512E</p>
            </footer>
        </>
    )
}

export default RegisterPage;