package test;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class guitest extends JFrame {
    private static final long serialVersionUID = 1L;

    public guitest() {
        // ��ͨ��ť�ؼ�
        JFrame jf = new JFrame("main");
        Toolkit tk = this.getToolkit();// �õ����ڹ�����
        int width = 650;
        int height = 500;
        Dimension dm = tk.getScreenSize();
        jf.setSize(300, 200);// ���ó���Ĵ�С
        jf.setLocation((int) (dm.getWidth() - width) / 2,
                (int) (dm.getHeight() - height) / 2);// ��ʾ����Ļ����
        jf.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        jf.setVisible(true);
        JPanel contentPane = new JPanel();
        jf.setContentPane(contentPane);

        // ����������ť�����ҽ���ť��ӵ����������

        JButton another = new JButton("����ҳ��");

        JButton close = new JButton("�ر�");

        contentPane.add(another);

        contentPane.add(close);

        another.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO Auto-generated method stub
                new exit();
            }
        });

        close.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO Auto-generated method stub
//                System.exit(0);
                jf.dispose();
            }
        });
    }

    public static void main(String[] args)

    {
        new guitest();

    }
}
