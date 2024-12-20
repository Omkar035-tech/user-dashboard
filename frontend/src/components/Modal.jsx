import React, { useEffect, useState } from "react";
import { CircleX } from 'lucide-react';

const Modal = ({ schema, onClose, onAction, user }) => {
    console.log(user)
    const [formData, setFormData] = useState({});

    // When the modal is opened for updating, populate formData with user data
    useEffect(() => {
        if (user) {
            const initialFormData = {};
            schema?.fields?.forEach(field => {
                initialFormData[field.name] = user[field.name] || '';
            });
            setFormData(initialFormData);
        }
    }, [user, schema.fields]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        const primaryAction = schema.buttons.find((btn) => btn.action !== "cancel");
        onAction(primaryAction.action, data);
    };

    const handleActionClick = (action) => {
        if (action === "cancel") {
            onClose();
        } else {
            onAction(action, null);
        }
    };

    return (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    <CircleX size={30} className="text-red-500" />
                </button>
                {schema.head && (<h1 className="font-semibold mb-2">{schema.head}</h1>)}
                {schema.fields && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {schema.fields.map((field, index) => (
                            <div key={index} className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''} // Bind input value to formData
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    min={field.min || undefined}
                                    max={field.max || undefined}
                                    accept={field.accept || undefined}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                        ))}
                        <div className="flex space-x-2">
                            {schema.buttons.map((button, index) => (
                                <button
                                    key={index}
                                    type={button.action === "cancel" ? "button" : "submit"}
                                    className={`px-4 py-2 rounded shadow text-white ${button.bg}`}
                                    onClick={
                                        button.action === "cancel"
                                            ? () => handleActionClick(button.action)
                                            : undefined
                                    }
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </form>
                )}
                {schema.message && (
                    <div className="text-center space-y-4">
                        <p className="text-lg font-medium text-gray-700 mt-3">{schema.message}</p>
                        <div className="flex space-x-2 justify-center">
                            {schema.buttons.map((button, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded shadow text-white ${button.bg}`}
                                    onClick={() => handleActionClick(button.action)}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
