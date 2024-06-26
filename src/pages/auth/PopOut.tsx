import { useDispatch } from "react-redux";
import { changedPop } from "../../global/GlobalFile";
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { getRegisteredApi } from "../../apis/emailApis";
import Swal from "sweetalert2"
import { HashLoader } from "react-spinners"
import { useState } from "react";

const PopOut = () => {

    const preventPaste = (e: any) => {
        e.preventDefault();
    }

    const dispatch = useDispatch()

    const Schema: any = yup.object({
        name: yup.string().required(),
        email: yup.string().required(),
    })

    const { handleSubmit, register, reset } = useForm({
        resolver: yupResolver(Schema)
    })

    const [loading, setLoading] = useState<boolean>(false)

    const onHandleSubmit = handleSubmit(async (data: any) => {
        setLoading(true)
        const { email, name } = data
        getRegisteredApi({ email, name }).then(() => {
            Swal.fire({
                icon: "success",
                text: "Successfully subsribed to our newsletter, please check your email for further information. PodA",
                title: "Newsletter subscription",
                timer: 3000,
                timerProgressBar: true
            })
            reset()
            setLoading(false)
        })
    })

    return (
        <>
            <div className="w-full h-full fixed bg-gray-900 bg-opacity-25  flex items-center justify-center top-0 z-[500] ">
                <form onSubmit={onHandleSubmit} className="fixed min-h-[400px] max-md:w-[90%] w-[500px] bg-white opacity-1 rounded-lg flex flex-col items-center">
                    <div className="w-[95%] text-[20px] font-[Blud] my-7">Join Waitlist</div>
                    <div className="w-[95%] text-[18px]">Get notifications on the launch of PodA and stay updated on our podcast activities.</div>
                    <label
                        htmlFor="Name"
                        className="relative w-[90%] my-3 h-[50px] block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="text"
                            id="Name"
                            autoComplete="off"
                            onPaste={preventPaste}
                            placeholder="Name"
                            {...register("name")}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        <span
                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                            Name
                        </span>
                    </label>
                    <label
                        htmlFor="UserEmail"
                        className="relative w-[90%] my-3 h-[50px] block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="email"
                            id="UserEmail"
                            autoComplete="off"
                            onPaste={preventPaste}
                            {...register("email")}
                            placeholder="Email"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        <span
                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                            Email
                        </span>
                    </label>
                    <div className="flex items-center justify-between my-4 max-md:flex-col max-md:w-full">
                        <button className="px-4 py-3 rounded-lg bg-black max-lg:w-[90%] text-white hover:bg-[#FF9A00]  transition-all duration-300 mr-5 max-lg:mr-0 flex justify-center items-center" type="submit">{loading ? <div className="flex items-center">Loading... <HashLoader size={25} color="white" className="ml-2" /></div> : "Join Waitlist"}</button>
                        <button className="px-4 py-3 max-lg:w-[90%] rounded-lg border hover:text-white hover:bg-[#FF9A00] transition-all duration-300 max-lg:my-3  " onClick={() => {
                            dispatch(changedPop())
                        }} >Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PopOut;
