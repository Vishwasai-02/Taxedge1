import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from '../../../../shared/components/Input/FormInput';
import type { InsuranceMember } from '../../types/member.types';

interface MemberFormProps {
  member: Partial<InsuranceMember>;
  onChange: (field: keyof InsuranceMember, val: any) => void;
}

export const MemberForm: React.FC<MemberFormProps> = ({ member, onChange }) => {
  return (
    <View style={styles.container}>
      <FormInput
        label="Full Name as on Aadhaar / PAN"
        value={member.fullName || ''}
        onChangeText={(v) => onChange('fullName', v)}
        placeholder="Enter member's legal name"
      />
      <FormInput
        label="Date of Birth (DD/MM/YYYY)"
        value={member.dob || ''}
        onChangeText={(v) => onChange('dob', v)}
        placeholder="e.g. 15/08/1990"
      />
    </View>
  );
};

const styles = StyleSheet.create({ container: { gap: 12 } });
export default MemberForm;
