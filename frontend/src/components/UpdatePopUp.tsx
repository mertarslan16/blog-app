// UpdatePopup.tsx

import React, { useState } from 'react';
import '../css/UpdatePopUp.css';

interface Blog {
    _id: string;
    title: string;
}

interface UpdatePopupProps {
    blog: Blog;
    onSubmit: (newTitle: string) => void;
    onClose: () => void;
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({ blog, onSubmit, onClose }) => {
    const [newTitle, setNewTitle] = useState(blog.title);
        const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) {
            setError("Title cannot be empty");
            return;
        }
        onSubmit(newTitle);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
        setError(null); // Her input değişikliğinde hata durumunu sıfırla
    };

    return (
        <div className="update-popup-container">
            <div className="update-popup">
                <form onSubmit={handleSubmit}>
                    <label>
                        Edit Title
                        <input type="text" value={newTitle} onChange={handleInputChange} />
                    </label>
                    <div className='popup-buttons'>
                        <button className='update-button' type="submit">Update</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePopup;
