import { useRef, useState } from "react";
import DangerButton from "@/Components/Button/DangerButton";
import InputError from "@/Components/Input/InputError";
import InputLabel from "@/Components/Input/InputLabel";
import Modal from "@/Components/Modal/Modal";
import SecondaryButton from "@/Components/Button/SecondaryButton";
import TextInput from "@/Components/Input/TextInput";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Удалить аккаунт
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Как только ваша учетная запись будет удалена, все ее ресурсы
                    и данные будут удалены безвозвратно. Перед удалением вашей
                    учетной записи, пожалуйста, загрузите любые данные или
                    информацию, которые вы хотите сохранить.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Удалить аккаунт
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Вы уверены, что хотите удалить свой аккаунт?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Как только ваша учетная запись будет удалена, все ее
                        ресурсы и данные будут удалены безвозвратно. Перед
                        удалением вашей учетной записи, пожалуйста, загрузите
                        любые данные или информацию, которые вы хотите
                        сохранить.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Отменить
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Удалить аккаунт
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
