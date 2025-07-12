
import React from "react";

type Props = {
  agreed: boolean;
  setAgreed: (v: boolean) => void;
};

export const FullApplicationModalDisclaimer: React.FC<Props> = ({ agreed, setAgreed }) => (
  <div className="p-4 bg-slate-50 rounded border border-slate-200 max-h-48 overflow-y-auto">
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1"
        checked={agreed}
        onChange={e => setAgreed(e.target.checked)}
        required
      />
      <span className="text-xs text-gray-700 space-y-1 block">
        <strong>Legal Disclaimer and Release of Liability Agreement</strong>
        <br /><br />
        <strong>By accessing, registering with, or utilizing the services provided by START Financial Freedom LLC dba Untouchable Dating ("the Platform"), I, the undersigned user ("User"), acknowledge and expressly agree to the following terms:</strong>
        <br /><br />
        <strong>No Liability for User Interactions</strong>
        <br />
        I understand and agree that START Financial Freedom LLC dba Untouchable Dating, including its owners, agents, affiliates, employees, successors, and assigns (collectively, "START Financial Freedom LLC dba Untouchable Dating and its Owners"), acts solely as a facilitator of introductions between consenting adults. START Financial Freedom LLC dba Untouchable Dating and its Owners make no representations or warranties regarding the character, intentions, background, or conduct of any user or individual introduced through the Platform.
        <br /><br />
        <strong>Assumption of Risk</strong>
        <br />
        I acknowledge that all interactions, communications, meetings, and/or relationships formed through or as a result of the Platform are undertaken solely at my own risk. I understand that START Financial Freedom LLC dba Untouchable Dating does not perform criminal background checks, psychological evaluations, or personal screenings of any kind, and I accept full responsibility for conducting my own due diligence.
        <br /><br />
        <strong>Indemnification and Release</strong>
        <br />
        I hereby waive, release, and discharge START Financial Freedom LLC dba Untouchable Dating and its Owners from any and all claims, demands, causes of action, liabilities, damages, or losses—whether direct, indirect, incidental, special, or consequential—arising out of or relating to any interaction, relationship, or dispute with any individual I meet through the Platform. This includes, without limitation, claims for emotional distress, financial loss, physical injury, or other harm.
        <br /><br />
        <strong>Recourse Through Appropriate Authorities</strong>
        <br />
        In the event of any dispute, misconduct, harm, or legal issue arising from my dating or relationship activities associated with any individual met through the Platform, I agree that my sole legal recourse shall be against the individual(s) involved. I further agree to report any criminal or harmful conduct to the appropriate local law enforcement or regulatory authorities, and I shall not hold START Financial Freedom LLC dba Untouchable Dating and its Owners responsible for initiating or participating in any legal proceedings.
        <br /><br />
        <strong>Binding Agreement</strong>
        <br />
        By registering with or using START Financial Freedom LLC dba Untouchable Dating, I affirm that I have read, understood, and voluntarily agree to be bound by the terms of this Legal Disclaimer and Release of Liability. This agreement shall be governed by and construed in accordance with the laws of the state or jurisdiction in which START Financial Freedom LLC dba Untouchable Dating operates, without regard to its conflict of law principles.
        <span className="text-red-700 font-semibold">*</span>
      </span>
    </label>
  </div>
);
