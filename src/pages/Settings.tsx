import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Phone, Heart, Scale, Calendar, Venus, Edit2, Save, X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { user, updateUser } = useUser();
  const { showToast } = useToast();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (field: string) => {
    setEditingField(field);
    switch (field) {
      case 'name':
        setEditValue(user?.name || '');
        break;
      case 'email':
        setEditValue(user?.email || '');
        break;
      case 'phone':
        setEditValue(user?.phone || '');
        break;
      case 'height':
        setEditValue(String(user?.height || ''));
        break;
      case 'weight':
        setEditValue(String(user?.weight || ''));
        break;
      case 'age':
        setEditValue(String(user?.age || ''));
        break;
      case 'gender':
        setEditValue(user?.gender || '');
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    if (!editingField) return;

    try {
      const updateData: Record<string, any> = {};
      
      switch (editingField) {
        case 'name':
          updateData.name = editValue;
          break;
        case 'email':
          updateData.email = editValue;
          break;
        case 'phone':
          updateData.phone = editValue;
          break;
        case 'height':
          updateData.height = parseFloat(editValue) || undefined;
          break;
        case 'weight':
          updateData.weight = parseFloat(editValue) || undefined;
          break;
        case 'age':
          updateData.age = parseInt(editValue) || undefined;
          break;
        case 'gender':
          updateData.gender = editValue;
          break;
        default:
          break;
      }

      await updateUser(updateData);
      showToast(`修改${getFieldLabel(editingField)}成功！`, 'success');
      setEditingField(null);
    } catch (error) {
      showToast('修改失败', 'error');
    }
  };

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      name: '昵称',
      email: '邮箱',
      phone: '手机号',
      height: '身高',
      weight: '体重',
      age: '年龄',
      gender: '性别',
    };
    return labels[field] || field;
  };

  const renderField = (field: string, label: string, icon: React.ReactNode) => (
    <motion.div
      key={field}
      className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          {editingField === field ? (
            <input
              type={field === 'height' || field === 'weight' || field === 'age' ? 'number' : 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-lg font-semibold text-slate-900 bg-transparent border-b-2 border-brand-primary outline-none py-1"
              autoFocus
            />
          ) : (
            <p className="text-lg font-semibold text-slate-900">
              {user?.[field as keyof typeof user] || '-'}
              {field === 'height' && user?.height && ' cm'}
              {field === 'weight' && user?.weight && ' kg'}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {editingField === field ? (
          <>
            <button
              onClick={handleSave}
              className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center"
            >
              <Save size={18} />
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={() => handleEdit(field)}
            className="w-10 h-10 bg-brand-surface rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <Edit2 size={18} className="text-brand-primary" />
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-brand-surface">
      <motion.div
        className="sticky top-0 z-10 bg-white shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-brand-surface rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-slate-900">设置</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={20} className="text-brand-primary" />
            <h2 className="text-lg font-semibold text-slate-900">个人信息</h2>
          </div>
          <div className="space-y-3">
            {renderField('name', '昵称', <User size={20} className="text-brand-primary" />)}
            {renderField('email', '邮箱', <Mail size={20} className="text-blue-500" />)}
            {renderField('phone', '手机号', <Phone size={20} className="text-green-500" />)}
            {renderField('height', '身高', <Heart size={20} className="text-red-500" />)}
            {renderField('weight', '体重', <Scale size={20} className="text-orange-500" />)}
            {renderField('age', '年龄', <Calendar size={20} className="text-purple-500" />)}
            {renderField('gender', '性别', <Venus size={20} className="text-pink-500" />)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center">
                <Edit2 size={20} className="text-slate-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">账号与安全</p>
                <p className="text-lg font-semibold text-slate-900">修改密码</p>
              </div>
            </div>
            <div className="text-slate-400">→</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center">
                <Heart size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500">偏好设置</p>
                <p className="text-lg font-semibold text-slate-900">运动提醒</p>
              </div>
            </div>
            <div className="text-slate-400">→</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center">
                <Mail size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500">通知设置</p>
                <p className="text-lg font-semibold text-slate-900">消息通知</p>
              </div>
            </div>
            <div className="text-slate-400">→</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};