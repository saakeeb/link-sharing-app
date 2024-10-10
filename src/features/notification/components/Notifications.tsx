import { useNavigate } from 'react-router-dom';
import useWebSocket from '@/hooks/useWebSocket';
import storage from '@/utils/storage';
import { WS_URL } from '@/config';
import React, { useEffect, useState } from 'react';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/constants';
import { Menu, Transition } from '@headlessui/react';
import { BiSolidBell } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';
import { useNotifications } from '../api/getNotifications';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import dayjs from 'dayjs';
import { useUpdateNotification } from '../api/updateNotification';
import { useUserStore } from '@/stores/userStore';

export const Notifications = () => {
  const { isLoading, data } = useNotifications();
  const updateNotification = useUpdateNotification();
  const token = storage.getToken();
  const navigate = useNavigate();
  const { receivedMessage } = useWebSocket(`${WS_URL}?token=${token}`);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;
  const dateTimeFormat =
    useSystemConfigStore((state) => state.settingsConfig?.dateTimeFormat) ??
    DEFAULT_DATE_TIME_FORMAT;

  const [notifications, setNotifications] = useState<any>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    if (data) {
      const count = data.filter((notification: any) => !notification.isRead).length;
      setUnreadNotificationsCount(count);
    }
  }, [data]);

  useEffect(() => {
    const sortedNotifications =
      data &&
      [...data].sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    setNotifications(sortedNotifications);
  }, [data]);

  useEffect(() => {
    if (receivedMessage && receivedMessage.success) {
      const newNotification = {
        id: receivedMessage.data.id,
        company: receivedMessage?.data?.company,
        isRead: receivedMessage.data.is_read,
        recipientName: receivedMessage.data.created_by_name,
        eventType: receivedMessage.data.event_type,
        message: receivedMessage.data.message,
        createdByName: receivedMessage.data.created_by_name,
        createdAt: receivedMessage.data.created_at,
      };
      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      setUnreadNotificationsCount((prevCount) => prevCount + 1);
    }
  }, [receivedMessage]);

  const handleUpdateNotification = async (notification: any) => {
    notification.company = companyId;
    if (notification.eventType === 'CAR_EXIT') navigate('/app/manage-parking');
    if (
      notification.eventType === 'APPROVED_ZREPORT' ||
      notification.eventType === 'REQUESTED_ZREPORT'
    )
      navigate('/app/z-report-list');

    try {
      const data = await updateNotification.mutateAsync({ ...notification, isRead: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button className="w-fit flex items-center text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="relative">
                <BiSolidBell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <div className="absolute -top-[3px] -right-[3px] h-3 w-3 rounded-full bg-primary-turquoise flex items-center justify-center">
                    <p className="text-white text-[8px]">{unreadNotificationsCount}</p>
                  </div>
                )}
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute -right-4 mt-[34px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="w-3 h-3 bg-white -top-1 z-10 absolute right-5 rotate-45"></div>
                <h3 className="text-xl font-bold px-4 pt-4">Notifications</h3>
                <hr className="mt-3" />
                <div className="w-[400px] h-[415px] overflow-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <p>Please wait...</p>
                    </div>
                  ) : notifications && notifications.length > 0 ? (
                    notifications?.map((notification: any, index: number) => (
                      <div
                        key={index}
                        className={`${
                          !notification.isRead ? 'bg-gray-200' : 'bg-white'
                        } flex items-center py-2 hover:bg-gray-300 cursor-pointer px-4`}
                        onClick={() => handleUpdateNotification(notification)}
                      >
                        <TfiEmail className="text-gray-500 h-8 w-8" />
                        <span className="block h-8 w-[1px] bg-gray-400 mx-4"></span>
                        <Menu.Item key={index}>
                          {() => (
                            <div>
                              <p className="text-base">{notification.message}</p>
                              <p className="text-[11px] mt-0.5">
                                {dayjs(notification.createdAt).format(`${dateTimeFormat}`)}
                              </p>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center mt-5">
                      <p>No notification found</p>
                    </div>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
