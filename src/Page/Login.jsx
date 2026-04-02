import {useState} from "react";
import {useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";
const login = (email, password) => {
    const users =
        JSON.parse(localStorage.getItem("youtube_app_users")) || [];

    const user = users.find(
        u => u.email === email
    );

    if (!user) {
        alert("Sai email !");
        return false;
    }

    const matchPassword = bcrypt.compareSync(password, user.password);

    if (matchPassword === true) {
        alert("Đăng nhập thành công!");
        localStorage.setItem(
            "current_user",
            JSON.stringify({ email: user.email })
        );
    } else {
        alert("Sai mật khẩu!");
    }

    return true;
};

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Nhập đầy đủ thông tin 😅");
            return;
        }
        try {
            login(email, password);
            alert("Đăng nhập thành công!");
            navigate("/")
            setEmail("");
            setPassword("");
        } catch (err) {
            alert(err.message);
        }
    };

    return(
        <>
            <header className="w-250">
                <div className="banner"><img src="https://img.freepik.com/vector-cao-cap/banner-ngang-youtube-gradient-vector-mien-phi_726768-1152.jpg" alt="banner_yt"/></div>
            </header>
            <main className="bg-cyan-800">
                <div className="container flex  items-center justify-center h-screen">
                    <form onSubmit={handleLogin}>
                        <h2 className="flex items-center bg-red-100 w-350 rounded-sm">Đăng nhập</h2>
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
                        <button type="submit">Đăng nhập</button>
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
};

export default LoginPage;