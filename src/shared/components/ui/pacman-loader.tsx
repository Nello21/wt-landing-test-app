import { PacmanLoader } from "react-spinners";

export const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <PacmanLoader
                color="black"
                loading={true}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <span>Загрузка</span>
        </div>
    );
};
