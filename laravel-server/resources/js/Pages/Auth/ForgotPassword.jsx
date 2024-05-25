import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Input/InputError";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Забыли пароль? Без проблем. Просто сообщите нам свой адрес
                электронной почты, и мы вышлем вам пароль. ссылку сброса,
                которая позволит вам выбрать новый.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Ссылка для сброса пароля
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
