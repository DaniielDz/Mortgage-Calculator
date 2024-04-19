import { useState } from 'react';

function ColorToggleButton({ onTabChange }) {
    // Estado para rastrear la pestaña activa (0 o 1)
    const [activeTab, setActiveTab] = useState(0);

    // Función para manejar el cambio de pestañas
    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
        // Llama a la función proporcionada como prop para cambiar el estado en la aplicación principal
        onTabChange(tabIndex);
    };

    return (
        <div className="tabs-container">
            <div className="tabs cursor-pointer">
                {/* Pestaña 1 */}
                <div
                    className={`tab rounded-l-full border border-[#ccc] border-r-0 ${activeTab === 0 ? 'active' : ''}`}
                    onClick={() => handleTabChange(0)}
                >
                    Overview
                </div>
                {/* Pestaña 2 */}
                <div
                    className={`tab rounded-r-full border border-[#ccc] border-l-0 ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabChange(1)}
                >
                    Details
                </div>
            </div>
        </div>
    );
}

export default ColorToggleButton;
