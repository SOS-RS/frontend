import React from 'react';

interface CheckBoxFilterProps {
    onChangeCheck: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    defaultChecked?: boolean;
    label: string;
}

const CheckBoxFilter: React.FC<CheckBoxFilterProps> = ({
    onChangeCheck,
    defaultChecked,
    label,
}) => {
    return (
        <div>
            <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={onChangeCheck}
                    defaultChecked={defaultChecked}
                />
                {label}
            </label>
        </div>
    );
};

export default CheckBoxFilter;