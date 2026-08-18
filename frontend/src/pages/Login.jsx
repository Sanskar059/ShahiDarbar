import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {

    e.preventDefault()

    try {

      const { data } = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/auth/login`,

        {
          email,
          password,
        }

      )

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      )

      document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=604800`

      alert("Login Successful")

      navigate("/")

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        "Login Failed"
      )

    }

  }

  return (

    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-6">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-luxury-gold mb-10">

          Login

        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none"
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-2xl text-xl font-bold hover:bg-primary/90"
          >

            Login

          </button>

        </form>

        {/* REGISTER */}

        <p className="text-center mt-6 text-gray-600">

          New User?

          <Link
            to="/register"
            className="text-luxury-gold font-bold ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  )
}

export default Login


