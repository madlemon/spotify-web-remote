import React from "react";
import useDialog from "../hooks/useDialog";
import {PencilIcon} from "@heroicons/react/outline";
import {useForm} from "react-hook-form";

function PlaylistEditDialog({callback}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        callback(data)
        close()
    };

    let content = <>
        <form
            className="flex flex-col space-y-2"
            onSubmit={handleSubmit(onSubmit)}>
            <input data-testid='playlist-form-name'
                   className='rounded-lg bg-zinc-400 px-2 py-1 border border-zinc-400 hover:border-zinc-300 focus:border-zinc-300'
                   {...register("name", {required: true})}
                   name="name"
            />
            {errors.name && <span>This field is required</span>}
            <input data-testid='playlist-form-description'
                   className='rounded-lg bg-zinc-400 px-2 py-1 border border-zinc-400 hover:border-zinc-300 focus:border-zinc-300'
                   {...register("description")}
                   name="description"
            />
            <input data-testid='playlist-form-submit'
                   className='rounded-full bg-white text-black cursor-pointer'
                   type="submit"
                   value="SPEICHERN"
            />
        </form>
    </>;

    const {open, close, dialog} = useDialog("Edit Playlist", [content])

    return (
        <div>
            <PencilIcon className="w-5 opacity-10 hover:opacity-100 cursor-pointer"
                        data-testid='playlist-edit-icon'
                        onClick={event => {
                            event.stopPropagation()
                            open()
                        }}/>
            {dialog}
        </div>
    )
}

export default PlaylistEditDialog
