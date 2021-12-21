import {getProviders, signIn} from "next-auth/react";

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <h1 className="text-white">Meine tolle Login-page</h1>

            {Object.values(providers).map((provider) => (
                <div key={provider.id}>
                    <button className="bg-green-400 text-white p-4 rounded-lg"
                            onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

