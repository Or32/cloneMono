'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {WaitlistEntryRequest, waitlistEntryRequestSchema} from "@/lib/contracts/waitList/waitlistEntry.contract";
import { forwardRef } from "react";
import {trpc} from "@/lib/trpc/client";

export const CallToAction = forwardRef<HTMLDivElement>((_, ctaScrollRef) => {
    const {register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }} = useForm<WaitlistEntryRequest>({
        resolver: zodResolver(waitlistEntryRequestSchema),
    });
    const joinWaitlistMutation = trpc.waitlist.joinWaitlist.useMutation();

    async function onSubmit(data: WaitlistEntryRequest) {
        await joinWaitlistMutation.mutateAsync(data); //TODO: Catch error and display
    }

    return (
        <section ref={ctaScrollRef} className="relative overflow-clip bg-gradient-to-b from-muted to-white py-24">
            <div className="container relative flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl rounded-md border-2 border-gray-100 bg-white drop-shadow-md p-14">
                    <div className="flex flex-col items-center">
                        <span className="text-center rounded-lg bg-muted py-px px-2 text-sm text-slate-800">117+ people joined this week</span>
                        <h3 className="mt-2 max-w-2xl text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">Want
                            to hear first when we launch? Join the waitlist!</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3">
                            <input type="email"
                                   {...register('email')}
                                   className="text-center grow rounded-lg border-2 border-gray-300 py-3 px-3 focus:border-primary focus:outline-none"
                                   placeholder="Email Address"/>

                            {errors.email && (
                                <p>{errors.email.message}</p>
                            )}

                            {!isSubmitSuccessful ?
                                <button type="submit" disabled={isSubmitting} className="hover:opacity-50 hover:cursor-pointer rounded-lg bg-primary px-5 py-4 font-bold text-white">
                                    {isSubmitting ? 'Getting you in...' : 'Join the Waitlist'}
                                </button>
                            :
                                <p className="text-center text-primary font-semibold">
                                    Thank you for joining the waitlist! We will keep you updated.
                                </p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
});