export default function ShowImageFile({ className = '', ...props }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                {...props}
                className="block max-w-full h-[100px] w-auto text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none hover:border-blue-500 transition-colors duration-200"
                style={{ objectFit: 'contain' }}                
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                    e.target.alt = "Placeholder image";
                }}
            />
        </div>
    );
}